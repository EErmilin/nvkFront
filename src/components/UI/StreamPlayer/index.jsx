/* eslint-disable react-hooks/exhaustive-deps */
import { API_OPERATION, CloudApi } from 'sbstream'
import { CloudClient, Utils } from 'sbstream/client'
import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'

import { fetchRequest } from '../../../API'
import {
    clearRequests,
    getPrivateRequests,
    getStreamById,
    loadActiveStream,
    selectChosenCameraId,
    selectChosenMicrophoneId,
    selectIpAddress,
    selectIsMediaDeviceLoading,
    selectLocked,
    selectRequests,
    selectResolution,
    selectSocket,
    selectStream,
    selectUser,
    updateStream,
} from '../../../redux'
import { getCloudToken } from '../../../utils/getCloudToken'
import { LoggerService } from '../../../utils/logger'
import { EStreamerStatus } from '../../../utils/streamerStatus'
import { setStreamTabId } from '../../../utils/tabIdLS'
import Controls from './Controls'
import { DEFAULT_VOLUME } from './Controls/utils'
import { ProducerTracker } from './ProducerStats'
import StreamInfo from './StreamInfo'
import StreamMessageComponent from './StreamMessage'
import { BitrateSubscriptionService } from './bitrate'
import './styles.scss'
import {
    BROADCAST_TYPE,
    ERRORS, // MAX_CONNECTION_ATTEMPTS,
    OPERATION_PUBLISH,
    OPERATION_SUBSCRIBE,
    PLAYER_CLASSES,
    STREAMING_STATUS,
    STREAM_TYPE,
    checkIfObsPublisher,
    checkIfPublish,
    codecOptions,
    generateMediaStreamConstraints,
    getOperation,
    getOrigin,
    getReceivingFrom,
    isBRB,
    kinds,
    loadNecessaryData,
    parseHash,
    startPlaying,
} from './utils'
import { getRtmpUrl } from '../../../utils/rtmpUrl'
import { useQuery } from '../../../hooks'
import { CAM_MODES } from '../../../constants'
import { useMemo } from 'react'

const isFirefox = Utils.isFirefox

const playbackWait = isFirefox ? 0.3 : 0.1 // fix for Firefox when video is not playable even though currentTime >0

const StreamPlayer = ({ forceViewer }) => {
    const dispatch = useDispatch()
    const { embedded, mode, popular } = useQuery()

    const { search } = useLocation()
    const history = useHistory()
    const locked = useSelector(selectLocked)
    const user = useSelector(selectUser)
    const stream = useSelector(selectStream)
    const socket = useSelector(selectSocket)
    const cameraId = useSelector(selectChosenCameraId)
    const microphoneId = useSelector(selectChosenMicrophoneId)
    const selectedResolution = useSelector(selectResolution)
    const isMediaDevicesLoading = useSelector(selectIsMediaDeviceLoading)
    const ipAddress = useSelector(selectIpAddress)
    const requests = useSelector(selectRequests)

    // Stream config
    const { id } = useParams()
    const [operation, setOperation] = useState(null)
    const [isPublish, setIsPublish] = useState(
        stream?.my && stream?.broadcastType === BROADCAST_TYPE.BROWSER
    )
    const [isObsPublisher, setIsObsPublisher] = useState(null)

    // UI
    const streamWrapperRef = useRef()
    const videoPlayerRef = useRef()
    const videoPlayerViewerRef = useRef()
    const controlsRef = useRef(null)
    const [isFullscreen, setIsFullScreen] = useState(false)
    const [streamingStatus, setStreamingStatus] = useState({
        status: STREAMING_STATUS.OFFLINE,
        videoBitrate: 0,
        audioBitrate: 0,
    })
    const bitrateSubscriptionInstanceRef = useRef(null)
    const producerTrackerInstanceRef = useRef(null)

    // Error handling
    const [error, setErrorToState] = useState(ERRORS.INITIALIZING)
    const errorRef = useRef(error) // needed inside the timer and events
    useEffect(() => {
        errorRef.current = error
    }, [error])

    // middleware to check cases when error shouldn't be changed
    const setError = (newError) => {
        console.log(
            `[setError] Current error: ${errorRef.current}. New error: ${newError}. Stream:`,
            streamRef.current
        )

        // unconditionally set these two errors
        if (
            newError === ERRORS.OFFLINE ||
            newError === ERRORS.OFFLINE_PUBLISH ||
            newError === ERRORS.COUNTRY_LOCKED
        ) {
            setErrorToState(newError)
            return
        }

        if (
            errorRef.current === ERRORS.BRB &&
            streamRef.current &&
            isBRB(streamRef.current)
        ) {
            // skipping
            return
        } else {
            setErrorToState(newError)
        }
    }

    // Sbstream
    const cloudApiRef = useRef(null)
    const cloudApiInstanceRef = useRef(null)
    const cloudClientRef = useRef(null)
    const cloudClientInstanceRef = useRef(null)
    const cloudClientViewerInstanceRef = useRef(null)

    const mediaStreamRef = useRef(null)
    const mediaStreamViewerRef = useRef(null)

    // Lib helpers
    const streamRef = useRef(stream)
    useEffect(() => {
        console.log('[useEffect] Updating streamRef to: ', stream)
        streamRef.current = stream
    }, [stream])

    const [configReady, setConfigReady] = useState(false)
    const [libInitialized, setLibInitialized] = useState(false)

    const [streamHash, setStreamHash] = useState(null)
    const [libHash, setLibHash] = useState(null)
    const libHashRef = useRef(libHash) // needed inside the events
    useEffect(() => {
        libHashRef.current = libHash
    }, [libHash])
    const disconnectedLibRef = useRef(null) // make it a lib hash, if it is the same as the current - reconnect

    useEffect(() => {
        if (stream?.broadcastId) {
            loadNecessaryData(id, stream, dispatch)
        }
    }, [stream?.broadcastId])

    useEffect(() => {
        return () => {
            // refetch active stream. Required if obs was stopped
            // so that streamer won't be redirected here again
            dispatch(loadActiveStream())
            if (!isPublish && !isObsPublisher) {
                console.log('[unmount] Stopping lib on unmount')
                stopLib()
            }
            LoggerService.setStreamData(null, null)
        }
    }, [])

    const handleReconnect = async () => {
        console.log('[handleReconnect] call')
        const resp = await fetchRequest('GET', 'api/streams/getbroadcastid')
        if (resp?.status === 'success') {
            const putResp = await fetchRequest(
                'PUT',
                `api/streams/${stream._id}`,
                { broadcastId: resp.data }
            )
            if (!putResp?.data) return
            console.log(
                `[handleReconnect] PUT request updated stream broadcastId to ${putResp.data.broadcastId}`,
                putResp
            )
            if (putResp.status === 'success') {
                console.log(
                    `[handleReconnect] Stream reconnected. New broadcastId: ${putResp.data.broadcastId}. Old broadcastId: ${stream.broadcastId}`
                )
                dispatch(
                    updateStream({ broadcastId: putResp.data.broadcastId })
                )
            }
        }
    }

    const onEmbeddedOffline = () => {
        if (embedded && popular) {
            history.push(`/${search}&top=${popular}`)
        }
    }

    useEffect(() => {
        if (stream?.message === 'no-stream') {
            onEmbeddedOffline()
            dispatch(clearRequests())
            setError(
                isPublish || isObsPublisher || stream?.my
                    ? ERRORS.OFFLINE_PUBLISH
                    : ERRORS.OFFLINE
            )
            if (isPublish || isObsPublisher || stream?.my) {
                stopLib()
            }
            if (videoPlayerRef.current) {
                videoPlayerRef.current.srcObject = null
            }
        }
        if (stream?.message === 'stream-stopped') {
            !(isPublish || isObsPublisher) && setError(ERRORS.STOPPED)
        }
        if (stream?.message === 'blocked-country') {
            setError(ERRORS.COUNTRY_LOCKED)
        }
    }, [stream?.message])

    useEffect(() => {
        if (stream?.msg === 'reconnect' && (isPublish || isObsPublisher)) {
            handleReconnect()
        }
    }, [stream?.msg])

    useEffect(() => {
        if (!stream || stream.message === 'no-stream') {
            return
        }

        if (isBRB(stream)) {
            setError(ERRORS.BRB)
        } else {
            if (error === ERRORS.BRB) {
                setError(stream.my ? ERRORS.MY_BRB_RESUMED : ERRORS.BRB_RESUMED)
            }
        }
    }, [stream?.streamerStatus])

    const pauseStream = () => {
        console.log('[pauseStream] You set BRB mode. Stopping Streaming lib')
        stopLib()
    }

    useEffect(() => {
        if (
            stream &&
            stream?.message !== 'no-stream' &&
            (isPublish || isObsPublisher) &&
            streamHash
        ) {
            console.log(
                `[useEffect] [stream?.streamerStatus] ${stream?.streamerStatus}`
            )
            if (stream.streamerStatus === EStreamerStatus.brb) {
                pauseStream()
            } else if (stream.streamerStatus === EStreamerStatus.resuming) {
                const { broadcastId } = parseHash(streamHash)
                if (broadcastId !== stream.broadcastId) {
                    console.log(
                        `[useEffect] [stream?.streamerStatus] Skipping stream resume. BroadcastId has changed`
                    )
                } else {
                    console.log(
                        'Resuming Streaming lib after BRB mode (completely reconnecting)'
                    )

                    handleReconnect()
                }
            }
        }
    }, [stream?.streamerStatus])

    useEffect(() => {
        if (
            stream &&
            streamHash &&
            !isPublish &&
            !isObsPublisher &&
            stream.streamerStatus === EStreamerStatus.brb
        ) {
            // stopping a lib for a viewer
            console.log(
                `[useEffect] Stoping a lib for a viewer due to BRB status`
            )
            stopLib()
        }
    }, [stream?.streamerStatus])

    useEffect(() => {
        if (
            stream &&
            stream.broadcastId &&
            stream.streamType &&
            stream.broadcastStatus &&
            stream.broadcastType
        ) {
            LoggerService.setStreamData(stream._id, stream.broadcastId)

            if (
                stream.broadcastStatus === 'active' &&
                error === ERRORS.STOPPED
            ) {
                setError(null)
                return
            }

            if (
                stream.publishedBroadcastId !== stream.broadcastId &&
                !stream.my
            ) {
                console.log(
                    `[config] Waiting for the ${stream.broadcastId} to be published. Current published value: ${stream.publishedBroadcastId}`
                )
                setError(ERRORS.WAITING_FOR_PUBLISH)
                return
            }

            if (stream.broadcastStatus !== 'active' && !stream.my) {
                console.log(
                    "[config] Waiting for 'broadcastStatus' to become active..."
                )
                setError(ERRORS.WAITING_FOR_PUBLISH)
                return
            }

            if (isBRB(stream)) {
                console.log(
                    '[config] Waiting for a streamer to become active after brb'
                )
                return
            }

            const isPublishValue =
                forceViewer || isMobile ? false : checkIfPublish(stream)

            const isObsPublisherValue =
                forceViewer || isMobile ? false : checkIfObsPublisher(stream)

            const operationValue =
                forceViewer || isMobile
                    ? OPERATION_SUBSCRIBE
                    : getOperation(isPublishValue, isObsPublisherValue)

            setOperation(operationValue)
            setIsPublish(isPublishValue)
            setIsObsPublisher(isObsPublisherValue)

            if (forceViewer) console.log(`[config] Forced viewer mode`)

            const generatedHash = `hash__${stream.broadcastId}-${stream.streamType}-${stream.broadcastType}__operation:${operationValue}-isPublish:${isPublishValue}-isObsPublisher:${isObsPublisherValue}`
            setStreamHash(generatedHash)

            console.log(`[config] New stream hash generated: ${generatedHash}`)
        } else {
            setStreamHash(null)
        }
    }, [
        stream?.broadcastId,
        stream?.publishedBroadcastId,
        stream?.streamType,
        stream?.broadcastStatus,
        stream?.broadcastType,
        stream?.streamerStatus,
        forceViewer,
    ])

    useEffect(() => {
        if (configReady || (!socket?.id && !embedded)) {
            return
        }

        if (operation && stream?.broadcastId) {
            if (operation === OPERATION_PUBLISH && !isMediaDevicesLoading) {
                setConfigReady(true)
                console.log(
                    `[config] Config is ready. isMediaDevicesLoading:${isMediaDevicesLoading}, operation: ${operation}, stream broadcastId: ${stream.broadcastId}, socket id: ${socket?.id}`
                )
            } else if (operation === OPERATION_SUBSCRIBE) {
                setConfigReady(true)
                console.log(
                    `[config] Config is ready. isMediaDevicesLoading:${isMediaDevicesLoading}, operation: ${operation}, stream broadcastId: ${stream.broadcastId}, socket id: ${socket?.id}`
                )
            }
        }
    }, [isMediaDevicesLoading, operation, stream?.broadcastType, socket?.id])

    const initLib = async () => {
        cloudClientRef.current = new CloudClient(
            process.env.REACT_APP_SBSTREAM_URL,
            process.env.REACT_APP_SBSTREAM_TOKEN
        )

        cloudApiRef.current = new CloudApi(
            process.env.REACT_APP_SBSTREAM_URL,
            process.env.REACT_APP_SBSTREAM_TOKEN,
            () => { }
        )

        console.log('[initLib] Cloud client is initialized')
        setLibInitialized(true)
    }

    useEffect(() => {
        if (configReady) {
            initLib()
        }
    }, [configReady])

    const playbackTimeRef = useRef(0)
    const playbackCheckIntervalRef = useRef(null)
    const playbackStatusIntervalRef = useRef(null)

    const onTimeUpdate = () => {
        // console.log(`[event] onTimeUpdate event. Current time: ${videoPlayerRef.current.currentTime}. Last time: ${playbackTimeRef.current}`);

        if (
            videoPlayerRef.current &&
            playbackTimeRef.current < videoPlayerRef.current.currentTime &&
            videoPlayerRef.current.currentTime >= playbackWait &&
            errorRef.current === ERRORS.GETTING_READY
        ) {
            console.log(
                '[onTimeUpdate] Playback started',
                videoPlayerRef.current.currentTarget
            )
            setError(null)
        }

        playbackTimeRef.current = videoPlayerRef.current?.currentTime
    }

    const onPlayerStatusInterval = () => {
        if (!videoPlayerRef.current) {
            return console.log(
                '[onPlayerStatusInterval] no videoPlayerRef.current'
            )
        }
        if (!mediaStreamRef.current) {
            return console.log(
                '[onPlayerStatusInterval] no mediaStreamRef.current'
            )
        }
        console.log(
            `[onPlayerStatusInterval] CurrentTime: ${videoPlayerRef.current.currentTime}. Paused: ${videoPlayerRef.current.paused}. Volume: ${videoPlayerRef.current.volume}`
        )
    }

    const startLib = async () => {
        try {
            if (libHash) {
                await stopLib()
            } else {
                console.log(
                    "[startLib] No need to call stopLib() because it wasn't initialized"
                )
            }

            playbackCheckIntervalRef.current = setInterval(() => {
                onTimeUpdate()
            }, 1000 / 60) // 60 times per second

            playbackStatusIntervalRef.current = setInterval(() => {
                onPlayerStatusInterval()
            }, 1000 * 10) // every 10 seconds

            setError(ERRORS.CONNECTING)

            console.log(
                `[startLib] Trying to start lib with: ${streamRef.current.broadcastId}. Operation: ${operation}. isPublish: ${isPublish} isObsPublisher: ${isObsPublisher}`
            )

            if (isObsPublisher) {
                console.log('[startLib] Starting with OBS publisher mode')
                console.log(
                    '[startLib] File streaming will be done on the server'
                )
                setStreamTabId(true)

                cloudClientInstanceRef.current =
                    await cloudClientRef.current.create(
                        API_OPERATION.SUBSCRIBE,
                        streamRef.current.broadcastId,
                        { kinds }
                    )

                setStreamingStatus({
                    status: STREAMING_STATUS.NOT_VISIBLE,
                    videoBitrate: 0,
                    audioBitrate: 0,
                })

                if (cloudClientInstanceRef.current) {
                    console.log(
                        `[startLib] Cloud client instance created with operation SUBSCRIBE`
                    )

                    bitrateSubscriptionInstanceRef.current =
                        new BitrateSubscriptionService({
                            operation: 'OBS PUBLISH -> SUBSCRIBE',
                            broadcastId: streamRef.current?.broadcastId,
                            userId: user?._id,
                            errorRef,
                            setError,
                            setStreamingStatus,
                            reconnectStream: handleReconnect,
                            streamRef,
                            origin: getOrigin(cloudClientInstanceRef.current),
                            receivingFrom: getReceivingFrom(
                                cloudClientInstanceRef.current
                            ),
                        })
                    cloudClientInstanceRef.current.on(
                        'bitRate',
                        bitrateSubscriptionInstanceRef.current.onBitrateEvent
                    )
                }
            } else if (isPublish) {
                console.log('[startLib] Starting with WebRTC publisher mode')
                setStreamTabId(true)

                cloudClientInstanceRef.current =
                    await cloudClientRef.current.create(
                        API_OPERATION.PUBLISH,
                        streamRef.current.broadcastId,
                        {
                            kinds,
                            simulcast: true,
                            // stopTracks: true,
                            codecOptions,
                        }
                    )

                setStreamingStatus({
                    status: STREAMING_STATUS.NOT_VISIBLE,
                    videoBitrate: 0,
                    audioBitrate: 0,
                })

                if (cloudClientInstanceRef.current) {
                    console.log(
                        `[startLib] Cloud client instance created with operation PUBLISH`
                    )
                }

                const mediaConstraints = generateMediaStreamConstraints({
                    cameraId: cameraId || null,
                    microphoneId: microphoneId || null,
                    resolution: selectedResolution,
                    fps: 30,
                })

                mediaStreamRef.current = await Utils.getUserMedia(
                    mediaConstraints
                )
                console.log(
                    '[startLib] Created a stream with constraints: ',
                    mediaConstraints
                )

                bitrateSubscriptionInstanceRef.current =
                    new BitrateSubscriptionService({
                        operation: 'WEBRTC PUBLISH -> Stats Producers',
                        broadcastId: streamRef.current?.broadcastId,
                        userId: user?._id,
                        errorRef,
                        setError,
                        setStreamingStatus,
                        reconnectStream: handleReconnect,
                        streamRef,
                        origin: getOrigin(cloudClientInstanceRef.current),
                        receivingFrom: getReceivingFrom(
                            cloudClientInstanceRef.current
                        ),
                    })

                cloudApiInstanceRef.current = await cloudApiRef.current.create(
                    API_OPERATION.PUBLISH,
                    undefined,
                    streamRef.current.broadcastId
                )
                producerTrackerInstanceRef.current = new ProducerTracker(
                    cloudApiInstanceRef.current,
                    bitrateSubscriptionInstanceRef.current.onBitrateEvent
                )
                cloudClientInstanceRef.current.on(
                    'newProducerId',
                    ({ id, kind }) => {
                        producerTrackerInstanceRef.current.onProducer(id, kind)
                    }
                )

                cloudClientInstanceRef.current.publish(mediaStreamRef.current)

                console.log(
                    '[startLib] Published a stream to the Streaming server'
                )
            } else {
                console.log('[startLib] Starting with viewer mode')

                cloudClientInstanceRef.current =
                    await cloudClientRef.current.create(
                        API_OPERATION.SUBSCRIBE,
                        streamRef.current.broadcastId,
                        {
                            kinds,
                            // stopTracks: true
                        }
                    )

                if (cloudClientInstanceRef.current) {
                    console.log(
                        `[startLib] Cloud client instance created with operation SUBSCRIBE`
                    )

                    bitrateSubscriptionInstanceRef.current =
                        new BitrateSubscriptionService({
                            operation: 'SUBSCRIBE',
                            broadcastId: streamRef.current?.broadcastId,
                            userId: user?._id,
                            errorRef,
                            setError,
                            streamRef,
                            origin: getOrigin(cloudClientInstanceRef.current),
                            receivingFrom: getReceivingFrom(
                                cloudClientInstanceRef.current
                            ),
                        })
                    cloudClientInstanceRef.current.on(
                        'bitRate',
                        bitrateSubscriptionInstanceRef.current.onBitrateEvent
                    )
                }
            }

            let subscriberKindsTracker = [] // tracking kinds, if the array is empty for too long, setting streamer is offline

            if (operation === OPERATION_SUBSCRIBE) {
                console.log('[startLib] Subscribing to the stream')

                mediaStreamRef.current = await cloudClientInstanceRef.current.subscribe()

                if (isObsPublisher) {
                    console.log(">> Setting spatialLayer to 0 for OBS publisher");

                    cloudClientInstanceRef.current.setPreferredLayers({ spatialLayer: 0, temporalLayer: 0 });

                    console.log(">> cloudClientInstanceRef.current", cloudClientInstanceRef.current);
                    setTimeout(() => {
                        console.log(">> cloudClientInstanceRef.current after 5s", cloudClientInstanceRef.current);
                    }, 5000);
                }

                const eventHash = libHashRef.current

                cloudClientInstanceRef.current
                    .on('removetrack', (event) => {
                        const kind = event.track.kind
                        subscriberKindsTracker = subscriberKindsTracker.filter(
                            (k) => k !== kind
                        )
                        console.log(
                            `[removetrack] removed ${kind}. Updated subscriber kinds: ${JSON.stringify(
                                subscriberKindsTracker
                            )}`
                        )

                        if (!streamRef.current || isBRB(streamRef.current))
                            return

                        /**
                         * Handler for the following cases:
                         * 1) streamer reloaded the page (additionally setting up data for reconnection)
                         * 2) the stream was stopped (almost never used like that)
                         */
                        if (!subscriberKindsTracker.length) {
                            if (
                                errorRef.current !== ERRORS.OFFLINE_PUBLISH &&
                                errorRef.current !== ERRORS.OFFLINE &&
                                eventHash === libHashRef.current
                            ) {
                                console.log(
                                    `[removetrack] [setTimeout] No media tracks left. Stream seems to be Offline. Setting the status and removing srcObject from player`
                                )
                                onEmbeddedOffline()

                                setError(ERRORS.OFFLINE)

                                disconnectedLibRef.current = libHashRef.current

                                if (videoPlayerRef.current) {
                                    videoPlayerRef.current.srcObject = null
                                }
                            }
                        }
                    })
                    .on('addtrack', (event) => {
                        const kind = event.track.kind
                        subscriberKindsTracker.push(kind)
                        console.log(
                            `[addtrack] added ${kind}. Updated subscriber kinds: ${JSON.stringify(
                                subscriberKindsTracker
                            )}`
                        )

                        /**
                         * Reconnecting logic when webrtc streamer reloading the page
                         */
                        if (
                            streamRef.current.broadcastType ===
                            BROADCAST_TYPE.BROWSER && // if it's browser stream
                            subscriberKindsTracker.length === 1 && // and first track just appeared
                            disconnectedLibRef.current && // and lib was disconnected before
                            disconnectedLibRef.current === libHashRef.current && // and lib hash is still the same
                            mediaStreamRef.current // and media stream is still there
                        ) {
                            console.log(
                                `[addtrack] Tracks are back. Reconnecting after Offline status`
                            )

                            dispatch(getStreamById({ id, updateImgUrl: true }))
                            setError(ERRORS.GETTING_READY)
                            videoPlayerRef.current.srcObject =
                                mediaStreamRef.current
                            startPlaying(
                                videoPlayerRef.current,
                                controlsRef.current
                            )
                        }
                    })
            }

            videoPlayerRef.current.srcObject = mediaStreamRef.current

            startPlaying(videoPlayerRef.current, controlsRef.current)
            setError(ERRORS.GETTING_READY)

            const rtmpUrl = user ? getRtmpUrl(user) : null;

            await getCloudToken(
                streamRef.current.broadcastId,
                operation,
                socket?.id,
                ipAddress,
                isObsPublisher ? rtmpUrl : null
            )

            if (streamRef.current.streamType !== STREAM_TYPE.PRIVATE) {
                return
            }

            // Private mode
            // Cam2Cam initialization
            const viewerBroadcastId = `${streamRef.current.broadcastId}_viewer`
            if (streamRef.current.my) {
                console.log(
                    `[startLib] subscribing to a viewer stream with id: ${viewerBroadcastId}`
                )

                cloudClientViewerInstanceRef.current =
                    await cloudClientRef.current.create(
                        API_OPERATION.SUBSCRIBE,
                        viewerBroadcastId,
                        { kinds }
                    )

                if (cloudClientViewerInstanceRef.current) {
                    console.log(
                        `[startLib] Cloud client instance for viewer created with operation SUBSCRIBE`
                    )
                }

                mediaStreamViewerRef.current =
                    await cloudClientViewerInstanceRef.current.subscribe()

                videoPlayerViewerRef.current.srcObject =
                    mediaStreamViewerRef.current

                startPlaying(videoPlayerViewerRef.current, controlsRef.current)
            } else {
                console.log(
                    `[startLib] starting a viewer stream with id: ${viewerBroadcastId}`
                )

                cloudClientViewerInstanceRef.current =
                    await cloudClientRef.current.create(
                        API_OPERATION.PUBLISH,
                        viewerBroadcastId,
                        {
                            kinds,
                            simulcast: true,
                            // stopTracks: true,
                            codecOptions,
                        }
                    )

                if (cloudClientViewerInstanceRef.current) {
                    console.log(
                        `[startLib] Cloud client instance for viewer created with operation PUBLISH`
                    )
                }

                const mediaConstraints = generateMediaStreamConstraints({
                    cameraId: cameraId || null,
                    resolution: selectedResolution,
                    fps: 30,
                    videoOnly: true,
                })

                mediaStreamViewerRef.current = await Utils.getUserMedia(
                    mediaConstraints
                )
                console.log(
                    '[startLib] Created a stream with constraints: ',
                    mediaConstraints
                )

                cloudClientViewerInstanceRef.current.publish(
                    mediaStreamViewerRef.current
                )
                console.log(
                    '[startLib] Published a viewer stream to the Streaming server'
                )

                videoPlayerViewerRef.current.srcObject =
                    mediaStreamViewerRef.current

                startPlaying(videoPlayerViewerRef.current, controlsRef.current)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const toggleMicroForStreamer = async (newMutedValue) => {
        if (!mediaStreamRef.current) {
            console.log(
                '[toggleMicroForStreamer] No mediaStreamRef.current found'
            )
            return false
        }

        if (!cloudClientInstanceRef.current) {
            console.log(
                '[toggleMicroForStreamer] No cloudClientInstanceRef.current found'
            )
            return false
        }

        console.log(
            `[toggleMicroForStreamer] New newMuted value: ${newMutedValue}`
        )

        if (newMutedValue) {
            console.log(
                '[toggleMicroForStreamer] Streamer muted themself. Removing all audio tracks'
            )

            mediaStreamRef.current.getAudioTracks().forEach((t) => {
                console.log(
                    '[toggleMicroForStreamer] Stopped audio track and removed from client instance and media stream'
                )

                t.stop()
                mediaStreamRef.current.removeTrack(t)
                cloudClientInstanceRef.current.removeTrack(t)
            })
        } else {
            const mediaConstraints = generateMediaStreamConstraints({
                microphoneId: microphoneId || null,
                audioOnly: true,
            })

            console.log(
                '[toggleMicroForStreamer] Streamer unmuted themself. Creating an audio stream with constraints: ',
                mediaConstraints
            )

            const dummyAudioStream = await Utils.getUserMedia(mediaConstraints)

            dummyAudioStream.getAudioTracks().forEach((t) => {
                console.log(
                    '[toggleMicroForStreamer] Added audio track to original media stream and client instance'
                )

                mediaStreamRef.current.addTrack(t)
                cloudClientInstanceRef.current.addTrack(t)
            })
        }
    }

    const toggleMicroForPrivateViewer = async (newMutedValue) => {
        if (!mediaStreamViewerRef.current) {
            console.log(
                '[toggleMicroForPrivateViewer] No mediaStreamViewerRef.current found'
            )
            return false
        }

        if (!cloudClientViewerInstanceRef.current) {
            console.log(
                '[toggleMicroForPrivateViewer] No cloudClientViewerInstanceRef.current found'
            )
            return false
        }

        console.log(
            `[toggleMicroForPrivateViewer] New newMuted value: ${newMutedValue}`
        )

        if (newMutedValue) {
            console.log(
                '[toggleMicroForPrivateViewer] Private viewer muted themself. Removing all audio tracks'
            )

            mediaStreamViewerRef.current.getAudioTracks().forEach((t) => {
                console.log(
                    '[toggleMicroForPrivateViewer] Stopped audio track and removed from client instance and media stream'
                )

                t.stop()
                mediaStreamViewerRef.current.removeTrack(t)
                cloudClientViewerInstanceRef.current.removeTrack(t)
            })
        } else {
            const mediaConstraints = generateMediaStreamConstraints({
                microphoneId: microphoneId || null,
                audioOnly: true,
            })

            console.log(
                '[toggleMicroForPrivateViewer] Private viewer unmuted themself. Creating an audio stream with constraints: ',
                mediaConstraints
            )

            const dummyAudioStream = await Utils.getUserMedia(mediaConstraints)

            dummyAudioStream.getAudioTracks().forEach((t) => {
                console.log(
                    '[toggleMicroForPrivateViewer] Added audio track to original media stream and client instance'
                )

                mediaStreamViewerRef.current.addTrack(t)
                cloudClientViewerInstanceRef.current.addTrack(t)
            })
        }
    }

    const stopLib = async (broadcastId = null) => {
        try {
            console.log('[stopLib] Stopping a lib')

            disconnectedLibRef.current = null

            if (cloudApiInstanceRef.current) {
                cloudApiInstanceRef.current.clear()
                cloudApiInstanceRef.current = null
            }

            if (producerTrackerInstanceRef.current) {
                producerTrackerInstanceRef.current.stopService()
                producerTrackerInstanceRef.current = null
            }

            if (bitrateSubscriptionInstanceRef.current) {
                bitrateSubscriptionInstanceRef.current.stopService()
                bitrateSubscriptionInstanceRef.current = null
            }

            if (playbackCheckIntervalRef.current) {
                clearInterval(playbackCheckIntervalRef.current)
                playbackCheckIntervalRef.current = null
            }

            if (playbackStatusIntervalRef.current) {
                clearInterval(playbackStatusIntervalRef.current)
                playbackStatusIntervalRef.current = null
            }

            if (videoPlayerRef.current) {
                console.log('[stopLib] Clearing video in the player')
                videoPlayerRef.current.srcObject = null
            }

            if (mediaStreamRef.current) {
                console.log(
                    '[stopLib] Stopping stream tracks and clearing the stream'
                )
                mediaStreamRef.current.getTracks().forEach((t) => t.stop())
                mediaStreamRef.current = null
            }

            if (cloudClientInstanceRef.current) {
                console.log('[stopLib] Closing cloud client instance')
                cloudClientInstanceRef.current.close()
                cloudClientInstanceRef.current.on('removetrack', () => { })
                cloudClientInstanceRef.current.on('addtrack', () => { })
                cloudClientInstanceRef.current.on(
                    'connectionstatechange',
                    () => { }
                )
                cloudClientInstanceRef.current = null
            }

            if (cloudClientViewerInstanceRef.current) {
                console.log('[stopLib] Closing cloud client viewer instance')
                cloudClientViewerInstanceRef.current.close()
                cloudClientViewerInstanceRef.current = null
            }

            if (videoPlayerViewerRef.current) {
                console.log('[stopLib] Clearing viewer video in the player')
                videoPlayerViewerRef.current.srcObject = null
            }

            if (mediaStreamViewerRef.current) {
                console.log(
                    '[stopLib] Stopping viewer stream tracks and clearing the stream'
                )
                mediaStreamViewerRef.current
                    .getTracks()
                    .forEach((t) => t.stop())
                mediaStreamViewerRef.current = null
            }

            setStreamingStatus({
                status: STREAMING_STATUS.OFFLINE,
                videoBitrate: 0,
                audioBitrate: 0,
            })

            // setLibHash(null) // check it carefully
        } catch (err) {
            console.error('[stopLib] Error while stopping a lib: ', err)
        }
    }

    useEffect(() => {
        if (stream?._id && user) {
            dispatch(getPrivateRequests(stream._id))
        }
    }, [stream, user])

    useEffect(() => {
        if (locked) setError(ERRORS.PASSWORD)
    }, [locked])

    const streamIsBlocked = () => {
        return (
            !isObsPublisher &&
            !isPublish &&
            streamRef.current?.streamType === STREAM_TYPE.PRIVATE &&
            (streamRef.current?.privateViewerId !== user?._id ||
                !streamRef.current?.privateViewerId)
        )
    }

    const wrongConfigCombination = () => {
        return (
            streamRef.current?.broadcastType === BROADCAST_TYPE.OBS &&
            operation === OPERATION_PUBLISH &&
            streamRef.current?.streamType === STREAM_TYPE.PUBLIC
        )
    }

    const resetAudio = () => {
        console.log(
            '[resetAudio] mute all players and setting their volume to 0, update UI'
        )


        controlsRef.current?.publisherMuteMic(false, true)
        controlsRef.current?.privateViewerMuteMic(false, true)

        controlsRef.current?.onPrivateViewerVolumeChange(DEFAULT_VOLUME)
        controlsRef.current?.onVolumeChange(DEFAULT_VOLUME)

        if (videoPlayerRef.current) {
            // mute model's own player, set player's volume to default for viewers
            videoPlayerRef.current.muted =
                isPublish || isObsPublisher ? true : false
            videoPlayerRef.current.volume =
                isPublish || isObsPublisher ? 0 : DEFAULT_VOLUME
        } else {
            console.log("[resetAudio] streamer's player wasn't found")
        }

        if (videoPlayerViewerRef.current) {
            // mute private viewers's own player, set player's volume to default for model
            videoPlayerViewerRef.current.muted =
                isPublish || isObsPublisher ? false : true
            videoPlayerViewerRef.current.volume =
                isPublish || isObsPublisher ? DEFAULT_VOLUME : 0
        } else {
            console.log("[resetAudio] viewers's player wasn't found")
        }
    }

    useEffect(() => {
        console.log(
            `[useEffect] LibInitialized: ${libInitialized}. Hash: ${streamHash}. Stream: `,
            streamRef.current
        )
        if (!streamRef.current) {
            console.log(`[useEffect] No stream was found!`)
            return
        }

        if (!libInitialized || !streamHash) {
            console.log(`[useEffect] The config is not initialize yet`)
            return
        }

        if (streamIsBlocked()) {
            console.log(
                `[useEffect] The stream is private and you can't view it. Stopping the media`
            )
            stopLib()
            setLibHash(null)
            return
        }

        if (wrongConfigCombination()) {
            console.log(
                `[useEffect] Skipping lib initialization. Trying to run a wrong lib config. Operation: ${operation}. BroacastType: ${streamRef.current?.broadcastType}. StreamType: ${streamRef.current?.streamType}`
            )
            return
        }

        if (libHash === streamHash) {
            console.log(
                '[useEffect] streamHash and libHash are the same. No need to reinitialize the lib',
                streamHash,
                libHash
            )
            return
        }

        if (isBRB(streamRef.current)) {
            console.log(
                '[useEffect] Stream in BRB mode. No need to start it now'
            )
            return
        }

        console.log(
            '[useEffect] Reinitializing a lib with new streamHash',
            streamHash,
            libHash
        )
        setLibHash(streamHash)

        resetAudio()

        startLib()
    }, [libInitialized, streamHash, socket])

    const [streamerPlayerClass, setStreamerPlayerClass] = useState(null)
    const [viewerPlayerClass, setViewerPlayerClass] = useState(null)

    const hasNoPrivateViewerCamera = useMemo(() => requests[0] && requests[0].acceptedAt && !requests[0].hasCamera, [requests])
    useEffect(() => {
        if (
            !stream ||
            stream.streamType === STREAM_TYPE.PUBLIC ||
            (stream.streamType === STREAM_TYPE.PRIVATE &&
                stream.privateViewerId !== user?._id &&
                !stream.my) ||
            stream.message === 'no-stream'
        ) {
            setStreamerPlayerClass(PLAYER_CLASSES.MAIN)
            setViewerPlayerClass(null)
        } else if (requests[0]) {
            if (stream.my) {
                setStreamerPlayerClass(hasNoPrivateViewerCamera ? PLAYER_CLASSES.MAIN : PLAYER_CLASSES.SIDE)
                !hasNoPrivateViewerCamera && setViewerPlayerClass(PLAYER_CLASSES.MAIN)
            } else {
                setStreamerPlayerClass(PLAYER_CLASSES.MAIN)
                !hasNoPrivateViewerCamera && setViewerPlayerClass(PLAYER_CLASSES.SIDE)
            }
        }
    }, [stream, requests[0]])

    const onSidePlayerClick = (e) => {
        e.stopPropagation()

        if (e.target !== e.currentTarget) return

        if (viewerPlayerClass) {
            setStreamerPlayerClass(viewerPlayerClass)
            setViewerPlayerClass(streamerPlayerClass)
        }
    }

    return (
        <div
            className={classNames('streamPlayer', { isFullscreen })}
            id="stream"
        >
            <div
                className={classNames('streamPlayer__inner', { embedded: embedded && !mode?.includes(CAM_MODES.CHAT) })}
                ref={streamWrapperRef}
            >
                <video
                    muted
                    ref={videoPlayerRef}
                    className={classNames(`streamPlayer__inner__${streamerPlayerClass}`)}
                    id="videoStreamer"
                    playsInline
                    width="100%"
                    height="100%"
                />

                <StreamMessageComponent error={error} />

                {viewerPlayerClass && (
                    <video
                        muted
                        ref={videoPlayerViewerRef}
                        id="videoViewer"
                        className={`streamPlayer__inner__${viewerPlayerClass}`}
                        playsInline
                        width="100%"
                        height="100%"
                    />
                )}
                <Controls
                    ref={controlsRef}
                    isPublish={isPublish}
                    isObsPublisher={isObsPublisher}
                    stopLib={stopLib}
                    isFullscreen={isFullscreen}
                    setIsFullScreen={setIsFullScreen}
                    videoPlayer={videoPlayerRef.current}
                    videoPlayerViewer={videoPlayerViewerRef.current}
                    toggleMicroForStreamer={toggleMicroForStreamer}
                    toggleMicroForPrivateViewer={toggleMicroForPrivateViewer}
                    streamWrapperRef={streamWrapperRef.current}
                    error={error}
                    streamRef={streamRef}
                    onSidePlayerClick={onSidePlayerClick}
                    streamerPlayerClass={streamerPlayerClass}
                    viewerPlayerClass={viewerPlayerClass}
                    streamingStatus={streamingStatus}
                    handleReconnect={handleReconnect}
                />
            </div>
            {(!embedded || mode?.includes(CAM_MODES.CHAT)) && stream?.message !== 'blocked-country' && (
                <StreamInfo
                    isPublish={isPublish}
                    isObsPublisher={isObsPublisher}
                />
            )}
        </div>
    )
}

export default StreamPlayer
