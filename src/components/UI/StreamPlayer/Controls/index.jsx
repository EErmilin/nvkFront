/* eslint-disable react-hooks/exhaustive-deps */
import beforeunloadRequest from 'beforeunload-request'
import classNames from 'classnames'
import clsx from 'clsx'
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import { isMobile } from 'react-device-detect'
import { findDOMNode } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import screenfull from 'screenfull'

import { axiosInstance } from '../../../../API'
import { backArrow, eye } from '../../../../assets/icons'
import { FullScreen, Stop } from '../../../../assets/svg'
import { Button, LiveNow, UserAvatar } from '../../../../components'
import RuntimeComponent from '../../../../components/Runtime'
import { useBrowserTab, useQuery } from '../../../../hooks'
import { Modal } from '../../../../layout'
import {
    clearStream,
    deleteStreamByID,
    getUser,
    selectStream,
    selectUser,
} from '../../../../redux'
import { checkIosDevice } from '../../../../utils/checkIosDevise'
import { setStreamWasDeleted } from '../../../../utils/streamWasDeletedLS'
import {
    BROADCAST_TYPE,
    EObsStatus,
    STREAMING_STATUS,
    STREAM_TYPE,
    isBRB,
} from '../utils'
import { PLAYER_CLASSES } from '../utils'
import MicroComponent from './Micro'
import VolumeComponent from './Volume'
import styles from './styles.module.scss'
import { DEFAULT_VOLUME, prepareBitrateForDisplay } from './utils'
import { AFFILIATE_SOURCES } from '../../../../constants'

const windowWidth = window.innerWidth
const displayBackButton = windowWidth < 900 || isMobile

const Controls = forwardRef(
    (
        {
            isPublish,
            isObsPublisher,
            stopLib,
            isFullscreen,
            setIsFullScreen,
            videoPlayer,
            videoPlayerViewer,
            toggleMicroForStreamer,
            toggleMicroForPrivateViewer,
            streamWrapperRef,
            onSidePlayerClick,
            streamerPlayerClass,
            viewerPlayerClass,
            streamingStatus,
            streamRef,
            handleReconnect,
        },
        ref
    ) => {
        const history = useHistory()
        const dispatch = useDispatch()
        const stream = useSelector(selectStream)
        const user = useSelector(selectUser)

        // UI
        const [showControls, setShowConstrols] = useState(false)
        const [showConfirm, setShowConfirm] = useState(false)
        const [loaded, setLoaded] = useState(true)

        // public obs/webrtc
        const [muted, setMuted] = useState(false)
        const [volume, setVolume] = useState(DEFAULT_VOLUME)
        const [prevVolume, setPrevVolume] = useState()

        // privates cam2cam only
        const [privateViewerMuted, setPrivateViewerMuted] = useState(false)
        const [privateViewerVolume, setPrivateViewerVolume] =
            useState(DEFAULT_VOLUME)
        const [prevPrivateViewerVolume, setPrevPrivateViewerVolume] = useState()

        const timerRef = useRef()

        useEffect(() => {
            if (user) {
                setMuted(user?.accountType !== 'streamer')
                setVolume(DEFAULT_VOLUME)
            }
        }, [user?._id])

        useImperativeHandle(ref, () => ({
            publisherMuteMic(newMuted, skipStreamUpdate) {
                console.log(
                    `[publisherMuteMic] New newMuted value: ${newMuted}`
                )

                setMuted(newMuted)
                if (!skipStreamUpdate) {
                    toggleMicroForStreamer(newMuted)
                }
            },

            async stopStream(disableGetUser) {
                console.log('[onChangeTab stopStream start]')

                if ((isPublish && stream?._id) || isObsPublisher) {
                    streamRef.current = null
                    stopLib(stream.broadcastId) // providing broadcastid for safety
                    setLoaded(false)

                    try {
                        await axiosInstance.delete(`/api/streams/${stream._id}`)
                        setLoaded(true)

                        dispatch(clearStream())
                        dispatch(deleteStreamByID(stream._id))
                        !disableGetUser && dispatch(getUser())
                        console.log('[onChangeTab stopStream end]')

                        if (isObsPublisher) {
                            history.push('/')
                        }
                    } catch (e) { }
                }
            },
            privateViewerMuteMic(newMuted, skipStreamUpdate) {
                console.log(
                    `[privateViewerMuteMic] New newMuted value: ${newMuted}`
                )

                setPrivateViewerMuted(newMuted)
                if (!skipStreamUpdate) {
                    toggleMicroForPrivateViewer(newMuted)
                }
            },

            onVolumeChange(value) {
                if (!videoPlayer && value) {
                    console.log(
                        `[onVolumeChange] No streamer's video player found. Can't set new value ${value}`
                    )
                    return
                }

                // if (isPublish || isObsPublisher) return; // only viewer in public mode can access this
                if (isPublish) return // only viewer and obs publishers in public mode can access this

                // got unmuted
                if (muted && value) {
                    setMuted(false)
                    videoPlayer.muted = false
                    console.log(
                        `[onVolumeChange] Streamer's player unmuted with volume: ${value}`
                    )
                }

                // got muted
                if (!value) {
                    setMuted(true)
                    setPrevVolume(volume)
                    if (videoPlayer) {
                        videoPlayer.muted = true
                        console.log(
                            `[onVolumeChange] Streamer's player muted. Saving last volume: ${volume}`
                        )
                    } else {
                        console.log(
                            "[onVolumeChange] Streamer's player controls were reset"
                        )
                    }
                }

                setVolume(value)
                if (videoPlayer) {
                    videoPlayer.volume = value
                }
            },

            onPrivateViewerVolumeChange(value) {
                if (!videoPlayerViewer && value) {
                    console.log(
                        `[onPrivateViewerVolumeChange] No viewers's video player found. Can't set new value ${value}`
                    )
                    return
                }

                if (stream.streamType !== STREAM_TYPE.PRIVATE || !stream.my)
                    return // only stream in private mode can access this

                // got unmuted
                if (privateViewerMuted && value) {
                    setPrivateViewerMuted(false)
                    videoPlayerViewer.muted = false
                    console.log(
                        `[onPrivateViewerVolumeChange] Viewer's player unmuted with volume: ${value}`
                    )
                }

                // got muted
                if (!value) {
                    setPrivateViewerMuted(true)
                    setPrevPrivateViewerVolume(privateViewerVolume)
                    if (videoPlayerViewer) {
                        videoPlayerViewer.muted = true
                        console.log(
                            `[onPrivateViewerVolumeChange] Viewer's player muted. Saving last volume: ${privateViewerVolume}`
                        )
                    } else {
                        console.log(
                            "[onPrivateViewerVolumeChange] Viewer's player controls were reset"
                        )
                    }
                }

                setPrivateViewerVolume(value)
                if (videoPlayerViewer) {
                    videoPlayerViewer.volume = value
                }
            },
        }))

        // mutes the streamer's stream from the viewer's side
        const muteStreamer = () => {
            ref.current.onVolumeChange(muted ? prevVolume || DEFAULT_VOLUME : 0) // 0 if should get muted, previous value otherwise
        }

        // mutes the viewers's stream from the streamers's side (privates only)
        const mutePrivateViewer = () => {
            ref.current.onPrivateViewerVolumeChange(
                privateViewerMuted
                    ? prevPrivateViewerVolume || DEFAULT_VOLUME
                    : 0
            ) // 0 if should get muted, previous value otherwise
        }

        const iosFullScreenChecker = useRef(null)

        const onClickFullscreen = () => {
            const isIos = checkIosDevice()
            if (!isIos) {
                screenfull.toggle(findDOMNode(streamWrapperRef))
            } else {
                try {
                    videoPlayer.webkitEnterFullScreen()
                    if (!iosFullScreenChecker.current) {
                        iosFullScreenChecker.current = setInterval(() => {
                            if (videoPlayer) {
                                if (videoPlayer.paused) {
                                    videoPlayer.play()
                                }
                            }
                        }, 250)
                    }
                } catch (err) {
                    console.error(err)
                    alert("Wasn't able to open full screen")
                }
            }
        }

        const clearIosFullScreenChecker = () => {
            if (iosFullScreenChecker.current) {
                clearInterval(iosFullScreenChecker.current)
                iosFullScreenChecker.current = null
            }
        }

        useEffect(() => {
            if (!videoPlayer) {
                clearIosFullScreenChecker()
            }
        }, [videoPlayer])

        useEffect(() => {
            return () => {
                clearIosFullScreenChecker()
            }
        }, [])

        const toggleShowConfirm = () =>
            setShowConfirm((prev) => {
                if (prev) return false
                return !prev
            })

        const hideControls = () => setShowConstrols(false)

        const onMouseMove = () => {
            clearTimeout(timerRef.current)
            setShowConstrols(true)
            timerRef.current = setTimeout(hideControls, 3000)
        }

        const onFullscreenChange = () =>
            setIsFullScreen(screenfull.isFullscreen)

        useEffect(() => {
            let unblock
            if (stream?._id && (isPublish || isObsPublisher)) {
                unblock = history.block((e) => {
                    if (showConfirm || e.pathname.includes('stream')) {
                        return true
                    }
                    setShowConfirm(e)
                    return false
                })
            }

            return () => {
                if (unblock) {
                    unblock()
                }
            }
        }, [showConfirm, isPublish, isObsPublisher, stream?._id])

        useEffect(() => {
            const isIos = checkIosDevice()
            !isIos && screenfull.on('change', onFullscreenChange)
            streamWrapperRef?.addEventListener('mousemove', onMouseMove)
            return () => {
                streamWrapperRef?.removeEventListener('mousemove', onMouseMove)
                !isIos && screenfull.off('change', onFullscreenChange)
            }
        }, [streamWrapperRef])

        useEffect(() => {
            // dispatch(clearStream())
        }, [])

        const renderSideControls = () => {
            if (stream.my && streamerPlayerClass === PLAYER_CLASSES.SIDE) {
                // [streamer] my stream is minified, render mute button here
                return (
                    <MicroComponent
                        onClick={() => ref.current.publisherMuteMic(!muted)}
                        muted={muted}
                    />
                )
            } else if (stream.my && viewerPlayerClass === PLAYER_CLASSES.SIDE) {
                // [streamer] viewer stream is minified, render viewer's volume button here
                return (
                    <div className={styles.controls__volume}>
                        <VolumeComponent
                            muted={privateViewerMuted}
                            onMute={mutePrivateViewer}
                            volume={privateViewerVolume}
                            onVolumeChange={
                                ref.current?.onPrivateViewerVolumeChange
                            }
                            renderInput={false}
                        />
                    </div>
                )
            } else if (
                !stream.my &&
                viewerPlayerClass === PLAYER_CLASSES.SIDE
            ) {
                // [private viewer] my stream is minified, render viewer's mute button here
                return (
                    <MicroComponent
                        onClick={() =>
                            ref.current.privateViewerMuteMic(
                                !privateViewerMuted
                            )
                        }
                        muted={privateViewerMuted}
                    />
                )
            } else if (
                !stream.my &&
                streamerPlayerClass === PLAYER_CLASSES.SIDE
            ) {
                // [private viewer] streamer's stream is minified, render volume button here
                return (
                    <div className={styles.controls__volume}>
                        <VolumeComponent
                            muted={muted}
                            onMute={muteStreamer}
                            volume={volume}
                            onVolumeChange={ref.current?.onVolumeChange}
                            renderInput={false}
                        />
                    </div>
                )
            }
        }

        const renderBottomLeftControls = () => {
            if (stream.my && streamerPlayerClass === PLAYER_CLASSES.MAIN) {
                // [streamer] my stream is maximized, render mute button here
                return (
                    <MicroComponent
                        onClick={() => ref.current.publisherMuteMic(!muted)}
                        muted={muted}
                    />
                )
            } else if (stream.my && viewerPlayerClass === PLAYER_CLASSES.MAIN) {
                // [streamer] viewer stream is maximized, render viewer's volume button here
                return (
                    <VolumeComponent
                        muted={privateViewerMuted}
                        onMute={mutePrivateViewer}
                        volume={privateViewerVolume}
                        onVolumeChange={
                            ref.current?.onPrivateViewerVolumeChange
                        }
                    />
                )
            } else if (
                !stream.my &&
                viewerPlayerClass === PLAYER_CLASSES.MAIN
            ) {
                // [private viewer] my stream is maximized, render viewer's mute button here
                return (
                    <MicroComponent
                        onClick={() =>
                            ref.current.privateViewerMuteMic(
                                !privateViewerMuted
                            )
                        }
                        muted={privateViewerMuted}
                    />
                )
            } else if (
                !stream.my &&
                streamerPlayerClass === PLAYER_CLASSES.MAIN
            ) {
                // [private viewer] streamer's stream is maximized, render volume button here
                return (
                    <VolumeComponent
                        muted={muted}
                        onMute={muteStreamer}
                        volume={volume}
                        onVolumeChange={ref.current?.onVolumeChange}
                    />
                )
            }
        }

        const deleteStream = async () => {
            setStreamWasDeleted()
            beforeunloadRequest(`/api/streams/${stream._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
        }
        const { isStreamTab } = useBrowserTab()

        useEffect(() => {
            if (stream && stream.my && isStreamTab) {
                window.addEventListener('beforeunload', deleteStream)
            }
            return () =>
                window.removeEventListener('beforeunload', deleteStream)
        }, [stream, isStreamTab])
        const { origin, pathname } = window.location

        const { embedded, ref: userRef, source, click_id  } = useQuery()
        return (
            <>
                <div
                    className={classNames(styles.controls, {
                        [styles.active]:
                            showControls ||
                            stream?.obsStatus === EObsStatus.notFound,
                    })}
                    onClick={() => embedded && window.open(`${origin}${pathname}?source=${AFFILIATE_SOURCES.CAM_EMBED}${userRef ? `&ref=${userRef}`: ""}${source ? `&source=${source}`: ""}${click_id ? `&click_id=${click_id}`: ""}`)}
                >
                    {!embedded && displayBackButton && (
                        <div className={styles.controls__backToDashboard}>
                            <img
                                src={backArrow}
                                alt="back"
                                onClick={() => history.push('/')}
                            />
                        </div>
                    )}
                    {stream?.streamType === STREAM_TYPE.PRIVATE && (
                        <div
                            className={styles.controls__playerSideControls}
                            onClick={onSidePlayerClick}
                        >
                            {renderSideControls()}
                        </div>
                    )}

                    {stream?.broadcastType === BROADCAST_TYPE.OBS &&
                        stream?.obsStatus === EObsStatus.notFound && (
                            <div
                                className={
                                    styles.controls__playerMiddleControls
                                }
                                onClick={handleReconnect}
                            >
                                Reconnect
                            </div>
                        )}

                    <div className={styles.controls__bottom}>
                        {stream?.streamType === STREAM_TYPE.PRIVATE &&
                            renderBottomLeftControls()}

                        {!isPublish &&
                            // !isObsPublisher &&
                            stream?.streamType === STREAM_TYPE.PUBLIC && (
                                <VolumeComponent
                                    muted={muted}
                                    onMute={muteStreamer}
                                    volume={volume}
                                    onVolumeChange={ref.current?.onVolumeChange}
                                />
                            )}

                        {isPublish &&
                            !isObsPublisher &&
                            stream?.streamType === STREAM_TYPE.PUBLIC && (
                                <MicroComponent
                                    onClick={() =>
                                        ref.current.publisherMuteMic(!muted)
                                    }
                                    muted={muted}
                                />
                            )}

                        <div className={styles.controls__bottomRight}>
                            <div
                                className={clsx(
                                    styles.controls__duration,
                                    (stream?.message === 'no-stream' ||
                                        isBRB(stream, true)) &&
                                    styles.brb
                                )}
                            >
                                <RuntimeComponent providedStream={stream} />
                            </div>

                            {!embedded && stream?.broadcastId && !isBRB(stream, true) && (
                                <div className={styles.controls__view}>
                                    <img src={eye} alt="eye" />
                                    {stream?.viewersCount}
                                </div>
                            )}
                            {
                                !embedded && !!stream?.viewers?.length &&
                                <div className={styles.controls__users}>
                                    {stream?.viewers?.map((item, index) => (
                                        <div
                                            className={styles.controls__usersItem}
                                            key={index}
                                        >
                                            <UserAvatar avatar={item?.profileImg} />
                                        </div>
                                    ))}
                                </div>
                            }
                            {stream?.message !== 'no-stream' && (
                                <div
                                    className={styles.controls__screen}
                                    onClick={onClickFullscreen}
                                >
                                    <FullScreen full={isFullscreen} />
                                </div>
                            )}
                        </div>
                    </div>

                    {stream?.broadcastId && (
                        <>
                            <div
                                className={classNames(styles.controls__btns, {
                                    [styles.stopHidden]:
                                        !isPublish && !isObsPublisher,
                                })}
                            >
                                <span>
                                    <LiveNow
                                        // title={stream?.my && isBrowserTabStreaming ? "Live now" : "The broadcast started in another window"}
                                        title={'Live now'}
                                        transparent={
                                            isPublish || isObsPublisher
                                        }
                                    />
                                </span>
                                <span>
                                    <Button
                                        theme="redGrad"
                                        onClick={() => {
                                            console.log(
                                                `[User Action] clicked stop stream`
                                            )
                                            history.push('/')
                                        }}
                                        reverse
                                    >
                                        <span>Stop Stream</span>
                                        <Stop />
                                    </Button>
                                </span>
                            </div>

                            {stream?.my && (
                                <div
                                    className={classNames(
                                        styles.controls__streamingStatus
                                    )}
                                >
                                    <span
                                        className={
                                            styles.controls__streamingStatus__header
                                        }
                                    >
                                        {' '}
                                        Streaming status
                                    </span>
                                    <span>
                                        {prepareBitrateForDisplay(
                                            streamingStatus.videoBitrate,
                                            'Video'
                                        )}
                                    </span>
                                    <span>
                                        {prepareBitrateForDisplay(
                                            streamingStatus.audioBitrate,
                                            'Audio'
                                        )}
                                    </span>
                                    <div
                                        className={
                                            styles.controls__streamingStatus__status
                                        }
                                    >
                                        <div
                                            className={classNames(
                                                styles.controls__streamingStatus__status__icon,
                                                {
                                                    [styles.notVisible]:
                                                        streamingStatus.status ===
                                                        STREAMING_STATUS.NOT_VISIBLE,
                                                    [styles.active]:
                                                        streamingStatus.status ===
                                                        STREAMING_STATUS.VISIBLE,
                                                }
                                            )}
                                        ></div>
                                        <span>{streamingStatus.status}</span>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {showConfirm && (
                    <Modal toggleModal={toggleShowConfirm}>
                        <div className={styles.modal}>
                            <div className={styles.modal__title}>
                                Do you want to leave and stop the stream?
                            </div>
                            <div className={styles.modal__btns}>
                                <div className={styles.modal__btnsItem}>
                                    <Button
                                        onClick={() => setShowConfirm(false)}
                                        theme="green"
                                    >
                                        <span>Cancel</span>
                                    </Button>
                                </div>
                                <div className={styles.modal__btnsItem}>
                                    <Button
                                        onClick={async () => {
                                            await ref.current.stopStream()
                                            history.push(showConfirm.pathname)
                                        }}
                                        theme="red"
                                        disabled={!loaded}
                                    >
                                        <span>Yes</span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}
            </>
        )
    }
)

export default Controls
