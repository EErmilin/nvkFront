import React, { useEffect, useRef } from "react"
import classes from "./Movie.module.scss";
import { IBroadcast, IEpisodeBroadcast, IHlsBroadcast, ISeasonBroadcast } from '../../../../models/Broadcast';
import { BROADCAST } from "../../../../gql/query/broadcast/Broadcast";
import { getUpdateClient } from "../../../../requests/updateHeaders";
import { useParams } from "react-router-dom";

import VideoPlayer, { VideoPlayerHandle } from "../../../../components/VideoPleer/VideoPlayer";
import TransitionContainer from "../../../../components/TransitionContainer/TransitionContainer";
import { useState } from "react";
import EpisodeSlider from "../../../../components/UI/areas/EpisodeSlider/EpisodeSlider";
import { GET_MOVIE } from "../../../../gql/query/films/films";
import RatingNvk from "../../../../components/ratingNvk/ratingNvk";
import CommentSlider from "../../../../components/UI/areas/CommentSlider/CommentSlider";


export const Movie = ({ }) => {

  const { id } = useParams()
  const [duration, setDuration] = React.useState(0);
  const [isPlay, setIsPlay] = useState(false)




  const [movieData, setMovieData] = React.useState<any>(
    {} as any,
  );

  const [current, setCurrent]: any = useState(movieData.name)

  const videoPleerRef = useRef<VideoPlayerHandle>();


  React.useEffect(() => {
    (async () => {
      const client = await getUpdateClient();
      await client
        .query({
          query: GET_MOVIE,
          variables: { movieId: Number(id) },
        })
        .then(res => {
          setMovieData(res.data.movie);
          videoPleerRef.current?.setStream({
            url: res.data.movie?.media?.indexM3u8Url ?? '',
            media: { hls: res.data.movie?.media?.hls ?? [] },
          });
        })
        .catch(e => {
          console.log(JSON.stringify(e, null, 2));
        })
    })();

  }, [isPlay]);


  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + ' ч ' + minutes + ' мин';
  };

  console.log("movieData")
  console.log(movieData)


  return (
    <div>
      <div className={classes.broadcast}>
        <div><VideoPlayer ref={videoPleerRef} play={false} isShowBtn={false} /> </div>
        <div className={classes.broadcast_info}>
          <div className={classes.broadcast_info_title}>{current?.name ?? movieData.name}</div>
          <span className={classes.duration}>{getTimeFromMins(movieData.duration)} <span>/</span> {movieData.genre} </span>
          <div className={classes.language}>{movieData.language}</div>
          <div className={classes.broadcast_info_block}>
            <h2 className={classes.broadcast_info_content_title}>О фильме</h2>
            <div className={classes.broadcast_info_content}>{movieData.content}</div>
          </div>
          <div className={classes.broadcast_info_block}>
           <RatingNvk item={movieData}/>
          </div>
        </div>
      </div>
      {movieData.userVote&& <CommentSlider comments={movieData.userVote}/>}
    </div>
  )
}

export default Movie
