import React from 'react';
import classes from './AudioPlayer.module.scss';

class AudioPlayer extends React.Component {
    state = {
        playing: false,
        currentTime: 0,
        duration: 0
    }

    audioRef = React.createRef()

    handlePlay = () => {
        this.audioRef.current.play()
        this.setState({ playing: true })
    }

    handlePause = () => {
        this.audioRef.current.pause()
        this.setState({ playing: false })
    }

    handleTimeUpdate = () => {
        this.setState({
            currentTime: this.audioRef.current.currentTime,
            duration: this.audioRef.current.duration
        })
    }

    render() {
        const { playing, currentTime, duration } = this.state
        const { src } = this.props

        return (
            <div>
                <audio
                    ref={this.audioRef}
                    src={src}
                    onTimeUpdate={this.handleTimeUpdate}
                />

                <div className={classes.music_item}>


                    {!item.artwork || isNoImg ? <div className={classes.music_item_no_img} /> : <img className={classes.music_item_img} src={item.artwork} alt="Logo" onError={() => setIsNoImg(true)} />}
                    <div className={classes.music_item_wrp}>
                        <div className={classes.music_item_title}>{item.title} </div>
                        <div className={classes.music_item_name}>{item.artist}</div>

                    </div>
                </div>
                <div className={classes.music_item_btn_wrp}>
                    <FavoriteBtn id={item.id}></FavoriteBtn>
                    <div className={classes.music_item_btn} />
                </div>
                <button onClick={playing ? this.handlePause : this.handlePlay}>
                    {playing ? 'Pause' : 'Play'}
                </button>
                <p>{currentTime} / {duration}</p>
            </div>
        )
    }
}

export default AudioPlayer;