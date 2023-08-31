import { Micro } from '../../../../../assets/svg'
import styles from '../styles.module.scss'

const MicroComponent = ({ muted, onClick }) => {
    return (
        <div onClick={onClick} className={styles.controls__micro}>
            <Micro muted={muted} />
        </div>
    )
}

export default MicroComponent
