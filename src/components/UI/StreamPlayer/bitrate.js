import { fetchRequest } from "../../../API"
import { debounceLoggerCreator } from "../../../utils/selectiveLog"
import { EStreamerStatus } from "../../../utils/streamerStatus"
import { UserStatsService } from "../../../utils/userStats"
import { BROADCAST_TYPE, EObsStatus, NO_BITRATE_BEFORE_INACTIVY_MS, STREAMING_STATUS } from "./utils"

export class BitrateSubscriptionService {
  totalAudioBitrate = 0
  totalVideoBitrate = 0

  subscribedAt = Date.now()
  sentAt = this.subscribedAt
  lastEvent = this.subscribedAt
  lastNonZero = this.subscribedAt
  checkBitrateInterval = null

  firstEventLogged = false

  firstAudioBitrate = null
  firstVideoBitrate = null

  stoppedDueToInactivity = false

  debounceLogger = debounceLoggerCreator(10)

  constructor({
      operation,
      broadcastId,
      userId,
      errorRef,
      setError,
      setStreamingStatus = null,
      reconnectStream = null,
      streamRef,
      origin,
      receivingFrom,
      isResubscribe = false,
  }) {
      this.operation = operation
      this.broadcastId = broadcastId
      this.userId = userId
      this.errorRef = errorRef
      this.setError = setError
      this.setStreamingStatus = setStreamingStatus
      this.reconnectStream = reconnectStream
      this.streamRef = streamRef
      this.origin = origin
      this.receivingFrom = receivingFrom
      this.isResubscribe = isResubscribe

      console.log(
          `[BitrateSubscriptionService] Service for [${this.operation}] [${this.userId}] [${this.broadcastId}] Stream origin: ${this.origin}. Receiving from: ${this.receivingFrom}`
      )

      this.startCheckBitrateInterval()

      // 'false' when we're resubscribing to the same stream (after mute/unmute)
      if (!isResubscribe) {
        UserStatsService.sendBitrate({
          audioBitrate: 0,
          videoBitrate: 0,
          origin: this.origin,
          receivingFrom: this.receivingFrom,
        })
      }
  }

  stopService = () => {
      this.clearCheckBitrateInterval()
      console.log(
          `[BitrateSubscriptionService] Stopped service for [${this.operation}] [${this.userId}] [${this.broadcastId}]`
      )
  }

  clearCheckBitrateInterval = () => {
      if (this.checkBitrateInterval) {
          clearInterval(this.checkBitrateInterval)
          this.checkBitrateInterval = null
          console.log(
              `[BitrateSubscriptionService] Cleared interval for checkBitrate()`
          )
      }
  }

  startCheckBitrateInterval = () => {
      if (!this.checkBitrateInterval) {
          this.checkBitrateInterval = setInterval(() => {
              this.checkBitrate()
          }, 1000)
          console.log(
              `[BitrateSubscriptionService] [startCheckBitrateInterval] Created interval for checkBitrate()`
          )
      }
  }

  stopInactiveStream = async () => {
      console.log(
          `[stopInactiveStream] call. no-stream status: ${this.streamRef.current?.message === 'no-stream'
          }. stoppedDueToInactivity: ${this.stoppedDueToInactivity}`
      )

      if (
          this.streamRef.current?.message === 'no-stream' ||
          this.stoppedDueToInactivity
      )
          return

      const resp = await fetchRequest('PUT', `api/streams/stop`)
      if (resp.status === 'success') {
          // toast.error('Connection lost', { autoClose: false })
          console.log(
              '[stopInactiveStream] stream was stopped due to inactivity.'
          )
          this.stoppedDueToInactivity = true
      }
  }

  activateStream = async () => {
      console.log(
          `[activateStream] call. no-stream status: ${this.streamRef.current?.message === 'no-stream'
          }. stoppedDueToInactivity: ${this.stoppedDueToInactivity}`
      )

      if (
          this.stoppedDueToInactivity ||
          this.streamRef.current?.message === 'no-stream'
      ) {
          const resp = await fetchRequest('PUT', `api/streams/activate`)
          if (resp.status === 'success') {
              // toast.info('Your stream was reactivated.')
              console.log('[activateStream] stream was reactivated')
              this.stoppedDueToInactivity = false
          }
      }
  }

  checkBitrate = () => {
      const now = Date.now()

      if (
          this.streamRef.current?.broadcastType === BROADCAST_TYPE.OBS &&
          this.streamRef.current?.obsStatus !== EObsStatus.connected
      ) {
          this.debounceLogger(
              `[checkBitrate] waiting for a obs stream to start. Current status: ${this.streamRef.current?.obsStatus}`
          )
          this.lastEvent = now // to prevent an inactivity right after obs stream is connected or not found
          return
      }


      const lastEventDiff = now - this.lastEvent
      const nonZeroDiff = now - this.lastNonZero; 

      if (lastEventDiff > NO_BITRATE_BEFORE_INACTIVY_MS / 4 || nonZeroDiff > NO_BITRATE_BEFORE_INACTIVY_MS / 4) {
          console.log(
              `[checkBitrate] from last bitrate event: ${lastEventDiff}ms, from last non-zero: ${nonZeroDiff}ms`
          )
      }

      if (lastEventDiff >= NO_BITRATE_BEFORE_INACTIVY_MS || nonZeroDiff >= NO_BITRATE_BEFORE_INACTIVY_MS) {
          // if there was no bitrate event for N seconds
          console.log(`[checkBitrate] No bitrate or zero bitrate for ${NO_BITRATE_BEFORE_INACTIVY_MS} seconds!`)
          this.clearCheckBitrateInterval()

          if (
              this.streamRef.current?.my &&
              this.streamRef.current?.streamerStatus !== EStreamerStatus.brb
          ) {
              this.stopInactiveStream()
          }
      }
  }

  sendMinuteBitrate = () => {
      if (this.stoppedDueToInactivity) {
        console.log(`[BitrateSubscriptionService] Minute bitrate won't be send. Stream is stopped due to inactivity`);
        this.totalAudioBitrate = 0;
        this.totalVideoBitrate = 0;
        return;
      }

      let minuteAudioBitrate = this.totalAudioBitrate
      let minuteVideoBitrate = this.totalVideoBitrate

      console.log(
          `[BitrateSubscriptionService] [${this.operation}] [${this.userId}] [${this.broadcastId}] New bitrate/minute. Video: ${minuteVideoBitrate}. Audio: ${minuteAudioBitrate}`
      )

      UserStatsService.sendBitrate({
          audioBitrate: minuteAudioBitrate,
          videoBitrate: minuteVideoBitrate,
          origin: this.origin,
          receivingFrom: this.receivingFrom,
      })

      this.totalAudioBitrate = this.totalAudioBitrate - minuteAudioBitrate
      this.totalVideoBitrate = this.totalVideoBitrate - minuteVideoBitrate
  }

  isVisible = (prev, bitrate) => {
    return prev.videoBitrate || prev.audioBitrate || bitrate;
  } 

  handleStreamingStatus = (bitrate, kind) => {
      if (this.setStreamingStatus) {
          this.setStreamingStatus((prev) => ({
              status: this.isVisible(prev, bitrate) 
                ? STREAMING_STATUS.VISIBLE 
                : STREAMING_STATUS.NOT_VISIBLE,
              videoBitrate: kind === 'video' ? bitrate : prev.videoBitrate,
              audioBitrate: kind === 'audio' ? bitrate : prev.audioBitrate,
          }))
      }
  }

  handleFirstLog = (bitRate, kind) => {
      if (this.firstEventLogged) return

      if (this.firstAudioBitrate === null && kind === 'audio' && bitRate) {
          this.firstAudioBitrate = bitRate
          return
      }

      if (this.firstVideoBitrate === null && kind === 'video' && bitRate) {
          this.firstVideoBitrate = bitRate
          return
      }

      if (
        (this.firstVideoBitrate && this.firstAudioBitrate)
        || (this.firstVideoBitrate && this.isResubscribe) // when resubscribing, audio can be 0 if model got muted
        ) {
          console.log(
              `[BitrateSubscriptionService] First bitrates. Video: ${this.firstVideoBitrate} Audio: ${this.firstAudioBitrate}`
          )
          this.firstEventLogged = true

          // sending first minute bitrate as first audioBitrate
          UserStatsService.sendBitrate({
              audioBitrate: this.firstAudioBitrate || 0, // in case we are muted, to prevent from sending null values
              videoBitrate: this.firstVideoBitrate || 0, 
              origin: this.origin,
              receivingFrom: this.receivingFrom,
          })
      }
  }

  handleBitrateInterval = (bitrate) => {
      if (bitrate && !this.checkBitrateInterval) {
          this.startCheckBitrateInterval()
      }

      if (bitrate && this.stoppedDueToInactivity) {
          this.activateStream()
          console.log(
              `[BitrateSubscriptionService] [handleBitrateInterval] Received bitrate. Streamed is stopped due to inactivity. Trying to activate`
          )
      }
  }

  onBitrateEvent = ({ bitRate, kind }) => {
      // console.log('onBitrateEvent', bitRate, kind, this.lastEvent, this.lastNonZero);

      const now = Date.now()
      this.lastEvent = now

      if (bitRate) {
        this.lastNonZero = now;
      }

      this.handleBitrateInterval(bitRate)
      this.handleFirstLog(bitRate, kind)
      this.handleStreamingStatus(bitRate, kind)

      if (kind === 'audio') {
          if (bitRate < Infinity) this.totalAudioBitrate += bitRate
      } else if (kind === 'video') {
          if (bitRate < Infinity) this.totalVideoBitrate += bitRate
      }

      if (now - this.sentAt >= 1000 * 60) {
          this.sentAt = now
          this.sendMinuteBitrate()
      }
  }
}