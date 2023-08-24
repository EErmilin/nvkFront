import React, { useCallback, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { ILive } from '../../models/LiveStream';
import './VideoPlayer.css'; // Создайте файл стилей для вашего видеоплеера

type TProps = {
  video?: ILive 
}

const VideoPlayer = ({ video }: TProps) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(1);
  const playerRef = useRef<ReactPlayer>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const onPause = useCallback(()=>{setIsPlaying(false)},[])


  const onPlay = useCallback(()=>{setIsPlaying(true)},[])



  const toggleMute = () => {
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer();
      internalPlayer.muted = !internalPlayer.muted;
    }
  };


  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer();
      internalPlayer.volume = newVolume;
    }
  };

  const toggleFullScreen = () => {
    playerRef.current?.getInternalPlayer().requestFullscreen();
  };

  return (
    <div className="video-pleer-wraper">
      <ReactPlayer
        url={video?.url}
        controls={false}
        playing={isPlaying}
        volume={volume}
        width="100%"
        onPlay={onPlay}
        onPause={onPause}
        className='react-player'
      />
      <div className="controls">
        <div>
          <button onClick={togglePlay} className={isPlaying ? "" : "reverse"}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.9459 5.48294C18.4594 8.17021 20.7162 9.51385 20.9667 11.4761C21.0111 11.8239 21.0111 12.1761 20.9667 12.5239C20.7162 14.4862 18.4594 15.8298 13.9459 18.5171C9.43245 21.2043 7.1757 22.548 5.40253 21.7905C5.0883 21.6563 4.79249 21.4802 4.52266 21.2667C3 20.0618 3 17.3745 3 12C3 6.62546 3 3.93819 4.52266 2.73331C4.79249 2.51979 5.0883 2.34367 5.40253 2.20945C7.1757 1.45203 9.43245 2.79567 13.9459 5.48294Z" fill="white" />
            </svg>
          </button>
          <button onClick={toggleMute}>Toggle Mute</button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
        <button onClick={toggleFullScreen}>Full Screen</button>
      </div>
    </div>
  );
};

export default VideoPlayer;
