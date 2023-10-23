import React, { forwardRef, MutableRefObject, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { ILive } from '../../models/LiveStream';
import { IRadio } from '../../models/Radio';
import Controls from './Controls/Controls';
import VideoInfo from './Info/VideoInfo';
import './VideoPlayer.scss'; // Создайте файл стилей для вашего видеоплеера

type TProps = {
  steam?: ILive | IRadio;
  onAsk?: () => void;
  play?: boolean;
  isShowBtn?: boolean;
  isMain?: boolean;
}

export type VideoPlayerHandle = {
  setStream: React.Dispatch<React.SetStateAction<ILive | IRadio | undefined>>
  setProgramTitle: React.Dispatch<React.SetStateAction<string>>
}

const VideoPlayer = forwardRef(({ steam: streamInner, onAsk, play = true, isShowBtn = true, isMain = false }: TProps, ref) => {

  const playerRef = useRef<ReactPlayer>(null);
  const videoPleerWraper = useRef<any>();
  const [steam, setStream] = useState(streamInner)
  const [video, setVideo] = useState("")
  const [isOpenSettings, setIsOpenSettings] = useState(false)
  const [programTitle, setProgramTitle] = useState("")
  const [isFull, setIsFull] = useState(false)

  const [isPlaying, setIsPlaying] = useState(play);
  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false)




  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const onPause = useCallback(() => { setIsPlaying(false) }, [])

  useEffect(() => {
    setIsPlaying(play)
  }, [play])

  const onPlay = useCallback(() => { setIsPlaying(true) }, [])


  useImperativeHandle<unknown, VideoPlayerHandle>(ref, () => ({
    setStream,
    setProgramTitle
  }));

  const toggleMute = () =>
    setMute(!mute);

  const toggleSettings = () =>
    setIsOpenSettings(!isOpenSettings);

  useEffect(() => {
    setVideo(steam?.url ?? "")
  }, [steam])

  let clsWrapper = [isMain ? "video-pleer-wraper-main" : "video-pleer-wraper"]
  if (isFull) {
    clsWrapper = []
    clsWrapper.push("react-player-full")
  }
  if (steam?.name === "Тэтим" && isMain) {
    clsWrapper.push("teteam_main")
  }



  const cls = [isMain ? "react-player-main" : "react-player"]
  if (steam?.name === "Тэтим") {
    if (isMain) {
      clsWrapper.push("teteam_main")
    } else {
      cls.push("teteam")
    }
  }






  if (!steam) return
  const toggleFullScreen = () => {
    setIsFull(!isFull)
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

  const renderQuality = () => {
    const arr = steam.media?.hls.sort(function (a, b) {
      return (
        parseInt(b.name ?? '0', 10) - parseInt(a.name ?? '0', 10)
      );
    })
      .map(item => {
        return {
          name: item.name,
          url: item.m3u8Url,
        };
      })

    const handleChange = (item) => {
      setVideo(item.url)
      setIsOpenSettings(false)
    }

    return arr?.map((item, key) => {
      return <div key={key} className={"settings-item"} onClick={() => handleChange(item)}>{item.name}</div>
    })

  }


  return (
    <>
    <div className={clsWrapper.join(" ")}
      ref={videoPleerWraper}>
      {isOpenSettings ? <div className="settings">{renderQuality()}</div> :
        <ReactPlayer
          ref={playerRef}
          url={video}
          controls={false}
          playing={isPlaying}
          volume={volume}
          width="100%"
          height="100%"
          muted={mute}
          onPlay={onPlay}
          onPause={onPause}
          className={cls.join(" ")}
          playsInline={false}
          playsinline={false}
        />
      }
      <Controls
        steam={steam}
        volume={volume}
        isPlaying={isPlaying}
        mute={mute}
        togglePlay={togglePlay}
        toggleMute={toggleMute}
        toggleFullScreen={toggleFullScreen}
        handleVolumeChange={setVolume}
        toggleSettings={toggleSettings}
      />

     
    </div>
     {isShowBtn && <VideoInfo streamTitle={steam?.name} programTitle={programTitle} askButtonClick={onAsk} />}
     </>
  );
});

export default VideoPlayer;
