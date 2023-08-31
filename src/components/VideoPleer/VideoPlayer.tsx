import React, { forwardRef, MutableRefObject, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import { Stream } from 'stream';
import { ILive } from '../../models/LiveStream';
import { IRadio } from '../../models/Radio';
import { AskQuestionModalHandle } from '../modals/AskQuestionModal/AskQuestionModal';
import Controls from './Controls/Controls';
import VideoInfo from './Info/VideoInfo';
import './VideoPlayer.css'; // Создайте файл стилей для вашего видеоплеера

type TProps = {
  steam?: ILive | IRadio;
  askModal?: React.MutableRefObject<AskQuestionModalHandle | undefined>

}

export type VideoPlayerHandle = {
  setStream: React.Dispatch<React.SetStateAction<ILive | IRadio | undefined>>
  setProgramTitle: React.Dispatch<React.SetStateAction<string>>
}

const VideoPlayer = forwardRef(({ steam: streamInner, askModal }: TProps, ref) => {

  const playerRef = useRef<ReactPlayer>(null);
  const videoPleerWraper = useRef<any>();
  const [steam, setStream] = useState(streamInner)
  const [programTitle, setProgramTitle] = useState("")

  const [isPlaying, setIsPlaying] = useState(true);
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


  const toggleFullScreen = () => {
    if (videoPleerWraper.current) {
      screenfull.request(videoPleerWraper.current as Element);
    }
  };

  const askButtonClick = () => {
    askModal?.current?.open()
  }

  return (
    <div className="video-pleer-wraper"
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
        className='react-player'
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

      <VideoInfo streamTitle={steam?.name} programTitle={programTitle} askButtonClick={askButtonClick} />
    </div>
  );
});

export default VideoPlayer;
