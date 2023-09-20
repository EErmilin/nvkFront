import React, { useState, useRef, useEffect } from 'react'
import styles from "./PlayerTinny.module.scss";
import { BsArrowLeftShort } from "react-icons/bs"
import { BsArrowRightShort } from "react-icons/bs"
import { FaPlay } from "react-icons/fa"
import { FaPause } from "react-icons/fa"

const PlayerTinny = ({ timeJump, music }) => {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isNoImg, setIsNoImg] = useState(false)

  const chapters = [
    {
      start: 0,
      end: 15
    },
    {
      start: 60,
      end: 75
    }
  ]

  // references
  const audioPlayer = useRef();   // reference our audio component
  const progressBar = useRef();   // reference our progress bar
  const animationRef = useRef();  // reference the animation

  useEffect(() => {
    if (timeJump) {
      timeTravel(timeJump);
      setIsPlaying(true);
      play();
    } else {
      timeTravel(0);
    }
  }, [timeJump])

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  }

  const play = () => {
    audioPlayer.current.play();
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      play();
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
    setCurrentTime(progressBar.current.value);
  }

  const backThirty = () => {
    timeTravel(Number(progressBar.current.value) - 30);
  }

  const forwardThirty = () => {
    timeTravel(Number(progressBar.current.value) + 30);
  }

  const timeTravel = (newTime) => {
    progressBar.current.value = newTime;
    changeRange();
  }

  return (
    <div className={styles.audioPlayer}>

      <audio ref={audioPlayer} src={music.url} preload="metadata"></audio>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? <FaPause className={styles.stop}/> : <FaPlay className={styles.play} />}
      </button>
      {/* current time */}
 
    

      {/* progress bar */}
      
      <div className={styles.item}>
      {!music.artwork || isNoImg ? <div className={styles.item_no_img} /> :
                    <img className={styles.item_img} src={music.artwork} alt="Logo" onError={() => setIsNoImg(true)}/>}
        <div >
          <div className={styles.item_title}>{music.title} </div>
          <div className={styles.item_name}>{music.artist}</div>
          <div className={styles.progressBarWrapper}>
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>
        <input type="range" className={styles.progressBar} defaultValue="0" ref={progressBar} onChange={changeRange} />
        {chapters.map((chapter, i) => {
          const leftStyle = chapter.start / duration * 100;
          const widthStyle = (chapter.end - chapter.start) / duration * 100;
          return (
            <div
              key={i}
              className={`${styles.chapter} ${chapter.start == 0 && styles.start} ${chapter.end == duration && styles.end}`}
              style={{
                '--left': `${leftStyle}%`,
                '--width': `${widthStyle}%`,
              }}
            ></div>
          )
        })}
              <div className={styles.duration}>{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
      </div>
        </div>
      
 
      </div>

      {/* duration */}

    </div>
  )
}

export { PlayerTinny }