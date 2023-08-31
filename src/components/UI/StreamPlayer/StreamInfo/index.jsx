import classNames from 'classnames'
import copy from 'copy-to-clipboard'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { fetchRequest } from '../../../../API'
import {
    Bell,
    Close,
    Copy,
    Edit,
    Man,
    Save,
    Woman,
} from '../../../../assets/svg'
import { Button, UserAvatar } from '../../../../components'
import { useActionNeedAuth, useQuery } from '../../../../hooks'
import {
    selectOtherUser,
    selectStream,
    selectUser,
    toggleStarSubscription,
    updateOtherUser,
    updateStreamByID,
} from '../../../../redux'
import { toggleProfileSubscriptionState } from '../../../../redux/reducers/subscriptions'
import { selectUpdateStreamByIDLoading } from './constants'
import styles from './styles.module.scss'

const { origin } = window.location

const StreamInfo = ({ isPublish }) => {
    const stream = useSelector(selectStream)
    const streamer = useSelector(selectOtherUser)
    const user = useSelector(selectUser)
    const updateStreamByIDLoading = useSelector(selectUpdateStreamByIDLoading)

    const dispatch = useDispatch()

    const [loaded, setLoaded] = useState(true)
    const [streamName, setStreamName] = useState(stream?.name || '')
    const [changeTitle, setChangeTitle] = useState(false)

    const toggleChangeTitle = () => setChangeTitle(!changeTitle)

    const { openSignInModal, isAuth } = useActionNeedAuth(false)


    const saveStreamName = async () => {
        if (!updateStreamByIDLoading) {
            dispatch(
                updateStreamByID({ id: stream._id, data: { name: streamName } })
            ).then((res) => {
                if (!res.meta.rejectedWithValue) {
                    toggleChangeTitle()
                }
            })
        }
    }

    const handleCopyToClipboard = () => {

        if (user) {
            copy(`${origin}/stream/${user._id}?ref=${user?.referralCode}`)
            toast.info(`link is copied to clipboard`)
        }
    }

    const cancelEditingName = () => {
        setStreamName(stream.name)
        toggleChangeTitle()
    }

    const handleSubscribe = async () => {
        if (!isAuth) {
            openSignInModal()
            return
        }
        if (!streamer) return

        setLoaded(false)

        const resp = await fetchRequest(
            streamer.isSub ? 'DELETE' : 'POST',
            `api/subscribe/${streamer._id}`
        )

        if (resp.status === 'success') {
            dispatch(
                updateOtherUser({
                    isSub: !streamer.isSub,
                    subscribersCount: streamer.isSub
                        ? streamer.subscribersCount - 1
                        : streamer.subscribersCount + 1,
                })
            )

            dispatch(toggleStarSubscription({ _id: streamer._id }))

            dispatch(
                toggleProfileSubscriptionState({
                    user: streamer,
                    noSub: streamer.isSub,
                })
            )
        }
        setLoaded(true)
    }


    useEffect(() => {
        if (stream?.name) {
            setStreamName(stream.name)
        }
    }, [stream])

    const { embedded } = useQuery()

    return (
        <div className={styles.info}>
            <div className={styles.info__user}>
                <div className={styles.info__userAva}>
                    {
                        stream?.user?._id && (
                            <UserAvatar avatar={stream.user.profileImg} />
                        )
                    }
                </div>
                <span>
                    <div className={styles.info__userName}>
                        {stream?.user?.name}{' '}
                        {streamer?.gender === 'male' ? <Man /> : <Woman />}
                    </div>
                    {changeTitle ? (
                        <div className={styles.info__userInput}>
                            <input
                                type="text"
                                value={streamName}
                                maxLength={100}
                                onChange={(e) => setStreamName(e.target.value)}
                                autoFocus
                            />
                            <span>
                                <Close
                                    circle={false}
                                    onClick={cancelEditingName}
                                />
                                <Save onClick={saveStreamName} />
                            </span>
                        </div>
                    ) : (
                        <div className={styles.info__userTheme}>
                            <p>
                                {stream?.name}
                                {isPublish && (
                                    <Edit onClick={toggleChangeTitle} />
                                )}
                            </p>
                        </div>
                    )}
                </span>
            </div>
            <div
                className={classNames(styles.info__btns)}
            >
                {stream?.my ? (
                    <div
                        className={classNames(
                            styles.info__btnsItem,
                            styles.copy
                        )}
                    >
                        <Button
                            onClick={handleCopyToClipboard}
                            theme="pinkGrad"
                            reverse
                        >
                            <span>Copy stream link</span>
                            <Copy />
                        </Button>
                    </div>
                ) : !embedded && (
                    <>
                        <div className={styles.info__btnsItem}>
                            <Button
                                disabled={!loaded}
                                onClick={handleSubscribe}
                                theme="darkPink"
                            >
                                <span>
                                    {streamer?.isSub
                                        ? 'unsubscribe'
                                        : 'subscribe'}
                                </span>
                                <Bell />
                            </Button>
                        </div>
                    </>
                )}
            </div>

        </div>
    )
}

export default StreamInfo
