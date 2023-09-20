import { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicPlayer.css';
import classes from './MusicPlayer.module.scss';
import React from "react";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const MusicPlayer = ({ music, audioRef }: any) => {


  return (
    <AudioPlayer
      ref={audioRef}
      autoPlay
      className={classes.player}
      showSkipControls={false}
      showJumpControls={false}
      src={music.url}
      onPlay={e => {

      }
      }

    // other props here
    />
  );
}

export default MusicPlayer;