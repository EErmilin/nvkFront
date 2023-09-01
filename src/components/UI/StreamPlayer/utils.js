
import { fetchRequest } from '../../../API'
import { getStreamById } from '../../../redux'
import { EStreamerStatus } from '../../../utils/streamerStatus'

export const ERRORS = {
    CONNECTING: 'Connecting to a stream...',
    INITIALIZING: 'Initializing...',
    GETTING_READY: 'Getting ready to play...',
    OFFLINE: 'Streamer is offline',
    STOPPED: "Connection lost. We are trying to reconnect",
    OFFLINE_PUBLISH: 'This stream is deleted',
    PASSWORD:
        'This stream is password protected. Please enter the Stream password to watch the stream',
    NOT_ALLOWED: "You're not allowed to view a stream",
    BRB: 'The Sugar Star is currently away and will be back shortly',
    BRB_RESUMED: "Streamer's media is being resumed...",
    MY_BRB_RESUMED: 'Your media is being resumed...',
    UNABLE_TO_CONNECT: 'Unable to connect to the server',
    COUNTRY_LOCKED:
        'You are not allowed to view this page. Please contact administrator',
    WAITING_FOR_PUBLISH: 'Waiting for a streamer...'
}

export const MAX_CONNECTION_ATTEMPTS = 5

export const OPERATION_SUBSCRIBE = 'subscribe'
export const OPERATION_PUBLISH = 'publish'

export const STREAMING_STATUS = {
    OFFLINE: 'Offline',
    NOT_VISIBLE: 'Not visible',
    VISIBLE: 'Visible',
}

export const STREAM_TYPE = {
    PUBLIC: 'public',
    PRIVATE: 'private',
}

export const BROADCAST_TYPE = {
    OBS: 'obs',
    BROWSER: 'browser',
}

export const PLAYER_CLASSES = {
    MAIN: 'playerMain',
    SIDE: 'playerSide',
}

export const kinds = ['audio', 'video']

export const EObsStatus = {
    notStarted: 'Not Started',
    connecting: 'Connecting to OBS stream',
    connected: 'Connected to OBS stream',
    notFound: 'OBS stream not found',
}

export const codecOptions = {
    video: {
        videoGoogleMinBitrate: 1000,
        videoGoogleMaxBitrate: 5000,
        videoGoogleStartBitrate: 4000,
    },
}

export const NO_BITRATE_BEFORE_INACTIVY_MS = process.env.NO_BITRATE_TIMEMS || 20 * 1000;

export const startPlaying = (playbackVideo, controls) => {
    if (!playbackVideo) {
        console.log('[startPlaying] playbackVideo is null')
        return
    }

    console.log('[startPlaying] trying to play')

    let playPromise = playbackVideo.play()
    if (playPromise !== undefined) {
        playPromise
            .then((_) => { })
            .catch((_) => {
                console.log(
                    '[startPlaying] unable to play. Muting player, updating the UI'
                )

                playbackVideo.muted = true

                if (controls) {
                    controls.onVolumeChange(0)
                    controls.onPrivateViewerVolumeChange(0)
                } else {
                    console.error('[startPlaying] no controls provided')
                }

                playbackVideo.play().then(
                    () => { },
                    (_) => { }
                )
            })
    }
}

export const generateAudioConstraints = (mediaConstraints) => {
    const { microphoneId } = mediaConstraints

    return {
        audio: {
            deviceId: microphoneId || 'default',
            autoGainControl: true,
            noiseSuppression: true,
            echoCancellation: true,
        },
    }
}

export const generateVideoConstraints = (mediaConstraints) => {
    const { cameraId, resolution } = mediaConstraints

    return {
        video: {
            deviceId: cameraId || 'default',
            width:
                resolution === 'high'
                    ? {
                        min: 640,
                        ideal: 1280,
                        max: 1280,
                    }
                    : {
                        min: 320,
                        ideal: 480,
                        max: 640,
                    },
            height:
                resolution === 'high'
                    ? {
                        min: 480,
                        ideal: 720,
                        max: 720,
                    }
                    : {
                        min: 240,
                        ideal: 360,
                        max: 480,
                    },
        },
    }
}

export const generateMediaStreamConstraints = (mediaConstraints) => {
    const { audioOnly, videoOnly } = mediaConstraints

    console.log('mediaConstraints', mediaConstraints)

    if (videoOnly)
        return { ...generateVideoConstraints(mediaConstraints), audio: false }

    if (audioOnly)
        return { ...generateAudioConstraints(mediaConstraints), video: false }

    return {
        ...generateAudioConstraints(mediaConstraints),
        ...generateVideoConstraints(mediaConstraints),
    }
}

// Note: please, don't refactor it to one "if" statement, it will be impossible to manage
export const checkIfObsPublisher = (stream) => {
    // for viewers, isObsPublisher is 'false'
    if (!stream.my) return false

    // if it's browser stream, isObsPublisher is 'false'
    if (stream.broadcastType === BROADCAST_TYPE.BROWSER) {
        return false
    }

    return true
}

// Note: please, don't refactor it to one "if" statement, it will be impossible to manage
export const checkIfPublish = (stream) => {
    // for viewers, isPublish is 'false'
    if (!stream.my) return false

    if (stream.broadcastType === BROADCAST_TYPE.OBS) {
        return false
    }

    return true
}

export const getOperation = (isPublish, isObsPublisher) => {
    if (isPublish) {
        return OPERATION_PUBLISH
    } else {
        return OPERATION_SUBSCRIBE
    }
}

export const loadNecessaryData = (streamerId, stream, dispatch) => {
    console.log('[loadNecessaryData] Call')

    const missingFields = []

    if (!stream?._id) missingFields.push('_id')
    if (!stream?.broadcastType) missingFields.push('broadcastType')
    // if (!stream?.publishedBroadcastId) missingFields.push('publishedBroadcastId')
    if (!stream?.chatAllowedFor) missingFields.push('chatAllowedFor')
    if (!stream?.showsAllowed) missingFields.push('showsAllowed')
    if (!stream?.privateCostPerMinute)
        missingFields.push('privateCostPerMinute')
    if (!stream?.streamerStatus) missingFields.push('streamerStatus')

    if (missingFields.length) {
        console.log(
            `[loadNecessaryData] Loading stream to fill up ${missingFields.length} missing fields: `,
            missingFields
        )

        console.log('getStreamById call utils:262')

        dispatch(getStreamById({ id: streamerId }))
    }
}

export const sendStreamMapping = async ({
    server,
    streamId,
    streamerId,
    broadcastId,
}) => {
    console.log('[sendStreamMapping]', {
        server,
        streamId,
        streamerId,
        broadcastId,
    })

    const resp = await fetchRequest('POST', `api/streams/${streamId}/mapping`, {
        server,
        streamerId,
        broadcastId,
    })
    if (resp?.status === 'success') {
        console.log(`[sendStreamMapping] ${resp?.message}`)
    }
}

export const parseHash = (hash) => {
    // HASH example "hash__f444cf746362454a30523dde941101f23380612d9b0216cf0b3bb2629330-public-browser__operation:publish-isPublish:true-isObsPublisher:false"

    const [, streamInfo, operationInfo] = hash.split('__')
    const [broadcastId, streamType, broadcastType] = streamInfo.split('-')
    const [operationString, isPublishString, isObsPublisherString] =
        operationInfo.split('-')

    const operation = operationString.split(':')[1]
    const isPublish = isPublishString.split(':')[1]
    const isObsPublisher = isObsPublisherString.split(':')[1]

    // console.log(`[parsedHash]`, {broadcastId, streamType, broadcastType, operation, isPublish, isObsPublisher});

    return {
        broadcastId,
        streamType,
        broadcastType,
        operation,
        isPublish,
        isObsPublisher,
    }
}

export const getOrigin = (playback) => {
    if (playback.configs.origin) {
        return playback.configs.origin.url
    } else if (playback.configs.url) {
        return playback.configs.url
    } else {
        return 'Not Found'
    }
}

export const getReceivingFrom = (playback) => {
    return playback.configs?.url || 'Not Found'
}

export const isBRB = (stream, forceViewer = false) => {
  if (!stream) return false;
  
  if (stream.my && !forceViewer) {
    return stream.streamerStatus === EStreamerStatus.brb;
  } else {
    return stream.streamerStatus === EStreamerStatus.brb || stream.streamerStatus === EStreamerStatus.resuming;
  }
}