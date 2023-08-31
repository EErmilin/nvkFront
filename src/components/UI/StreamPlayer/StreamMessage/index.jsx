/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { black } from '../../../../assets/images'

import { StreamLock } from '../../../../assets/svg'
import {
    selectLocked,
    selectOtherUser,
    selectStream,
    selectUser,
} from '../../../../redux'
import { getImgUrl } from '../../../../utils/getImgUrl'
import { getStaticResourceURL } from '../../../../utils/getStaticResourceURL'
import { BROADCAST_TYPE, EObsStatus, ERRORS, isBRB } from '../utils'
import styles from './styles.module.scss'
import ImageRenderer from '../../../../components/Image'

const StreamMessageComponent = ({ error }) => {
    const user = useSelector(selectUser)
    const stream = useSelector(selectStream)
    const locked = useSelector(selectLocked)
    const otherUser = useSelector(selectOtherUser)
    const cannotViewPrivateError = useMemo(() => {
        if (
            !stream?.my &&
            stream?.streamType === 'private' &&
            stream?.privateViewerId !== user?._id
        ) {
            return ERRORS.BRB // when streamer is in private, other users should see it as BRB
        } else {
            return null
        }

        // eslint-disable-next-line
    }, [stream, user])

    const obsMessage = useMemo(() => {
        if (
            !stream?.my ||
            stream.broadcastType !== BROADCAST_TYPE.OBS ||
            !stream?.obsStatus
        )
            return null

        if (
            stream.obsStatus === EObsStatus.connecting ||
            stream.obsStatus === EObsStatus.notFound
        ) {
            return stream.obsStatus // displaying "Connecting..." and "Not found..." OBS messages
        }

        return null
    }, [stream?.obsStatus])

    return (
        <div
            className={classNames(styles.streamError__wrapper, {
                [styles.brb]: cannotViewPrivateError || isBRB(stream),
                [styles.error]:
                    (obsMessage || error) && !cannotViewPrivateError,
                [styles.offline]:
                    (stream?.message === 'no-stream' ||
                        error === ERRORS.OFFLINE) &&
                    !cannotViewPrivateError &&
                    !isBRB(stream),
            })}
        >
            {
                error === ERRORS.OFFLINE && stream?.user?.streamDefaultImg &&
                < ImageRenderer
                    className={styles.offline}
                    url={getStaticResourceURL(
                        `api/users/${stream.user?._id}/images/stream`
                    )}
                    alt="stream"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null // prevents looping
                        currentTarget.src = black
                    }}
                />
            }
            {(isBRB(stream) || cannotViewPrivateError) && otherUser?.brbImg ? (
                <>
                    <ImageRenderer url={getImgUrl(otherUser.brbImg)} alt="brb" />
                    <div className={styles.streamError__error}>
                        The Sugar Star is currently away and will be back
                        shortly
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.streamError__error}>
                        {locked && <StreamLock />}
                        {obsMessage || cannotViewPrivateError || error}
                    </div>
                </>
            )}
        </div>
    )
}

export default StreamMessageComponent
