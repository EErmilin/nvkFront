import React, { forwardRef, MutableRefObject, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { ILive } from '../../models/LiveStream';
import { IRadio } from '../../models/Radio';
import Controls from './Controls/Controls';
import VideoInfo from './Info/VideoInfo';
import './VideoPlayer.css'; // Создайте файл стилей для вашего видеоплеера

type TProps = {
  steam?: ILive | IRadio;
  onAsk?: () => void
  play?: boolean
  isShowBtn?: boolean
  isMain?: boolean
}

export type VideoPlayerHandle = {
  setStream: React.Dispatch<React.SetStateAction<ILive | IRadio | undefined>>
  setProgramTitle: React.Dispatch<React.SetStateAction<string>>
}

const VideoPlayer = forwardRef(({ steam: streamInner, onAsk, play = true, isShowBtn = true, isMain = false }: TProps, ref) => {

  const playerRef = useRef<ReactPlayer>(null);
  const videoPleerWraper = useRef<any>();
  const [steam, setStream] = useState(streamInner)
  const [programTitle, setProgramTitle] = useState("")

  const [isPlaying, setIsPlaying] = useState(play);
  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false)



  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const onPause = useCallback(() => { setIsPlaying(false) }, [])


  const onPlay = useCallback(() => { setIsPlaying(true) }, [])


  useImperativeHandle<unknown, VideoPlayerHandle>(ref, () => ({
    setStream,
    setProgramTitle
  }));

  const toggleMute = () =>
    setMute(!mute);


  const clsWrapper = [isMain ? "video-pleer-wraper-main" : "video-pleer-wraper"]
    if(steam?.name === "Тэтим" && isMain){
      clsWrapper.push("teteam_main")
    }
    const cls = [isMain ? "react-player-main" : "react-player"]
    if(steam?.name === "Тэтим"){
      cls.push("teteam")
    }




    const toggleFullScreen = () => {
      if (videoPleerWraper.current) {
        if (screenfull.isEnabled) { // Проверяем поддержку полноэкранного режима
          if (screenfull.isFullscreen) {
            screenfull.exit();
          } else {
            screenfull.request(videoPleerWraper.current as Element);
          }
        } else {
          // Браузер не поддерживает полноэкранный режим, можно выполнить альтернативное действие
          console.log('Полноэкранный режим не поддерживается в этом браузере.');
        }
      }
    };
    

  return (
    <div className={clsWrapper.join(" ")}
      ref={videoPleerWraper}>
      <ReactPlayer
        ref={playerRef}
        url={steam?.url}
        controls={false}
        playing={isPlaying}
        volume={volume}
        width="100%"
        height="100%"
        muted={mute}
        onPlay={onPlay}
        onPause={onPause}
        className={cls.join(" ")}
      />

      <Controls
        volume={volume}
        isPlaying={isPlaying}
        mute={mute}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        toggleFullScreen={toggleFullScreen}
        handleVolumeChange={setVolume}
      />

      {isShowBtn && <VideoInfo streamTitle={steam?.name} programTitle={programTitle} askButtonClick={onAsk} />}
    </div>
  );
});

export default VideoPlayer;
