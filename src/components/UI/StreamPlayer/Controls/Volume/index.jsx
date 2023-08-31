import { useEffect, useRef } from 'react'

import { Sound } from '../../../../../assets/svg'
import styles from '../styles.module.scss'

const VolumeComponent = ({
    volume,
    onVolumeChange,
    muted,
    onMute,
    renderInput = true,
}) => {
    const spanRef = useRef(null)

    useEffect(() => {
        if (spanRef.current) {
            spanRef.current.style.width = `calc( 100% * ${volume} )`
        }
    }, [volume])

    return (
        <div className={styles.controls__volume}>
            {renderInput && (
                <div className={styles.controls__volumeInput}>
                    <input
                        type="range"
                        value={volume}
                        onChange={(e) => onVolumeChange(Number(e.target.value))}
                        min="0"
                        max="1"
                        step="0.01"
                    />
                    <span ref={spanRef}></span>
                </div>
            )}
            <div className={styles.controls__volumeSound} onClick={onMute}>
                <Sound muted={muted} volume={volume} />
            </div>
        </div>
    )
}

export default VolumeComponent
