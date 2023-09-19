import { useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './MusicPlayer.css';
import classes from './MusicPlayer.module.scss';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const MusicPlayer = ({ music, player}) => {

  console.log('!!!!!!!!!')
  console.log(player)
  console.log(player.current)

  return (
    <AudioPlayer
      ref={player}
      play
      autoPlay
      className={classes.player}
      showSkipControls={false}
      showJumpControls={false}
      src={music.url}
      onPlay={e => console.log("onPlay")}
    // other props here
    />
  );
}

export default MusicPlayer;