import React, { useEffect, useRef } from "react"
import classes from "./Serial.module.scss";
import { IBroadcast, IEpisodeBroadcast, IHlsBroadcast, ISeasonBroadcast } from '../../../../models/Broadcast';
import { BROADCAST } from "../../../../gql/query/broadcast/Broadcast";
import { getUpdateClient } from "../../../../requests/updateHeaders";
import { useParams } from "react-router-dom";

import VideoPlayer, { VideoPlayerHandle } from "../../../../components/VideoPleer/VideoPlayer";
import TransitionContainer from "../../../../components/TransitionContainer/TransitionContainer";
import { useState } from "react";
import EpisodeSlider from "../../../../components/UI/areas/EpisodeSlider/EpisodeSlider";
import { CURRENT_SERIAS, SERIALS } from "../../../../gql/query/series/Series";
import RatingNvk from "../../../../components/ratingNvk/ratingNvk";
import CommentSlider from "../../../../components/UI/areas/CommentSlider/CommentSlider";


export const Serial = ({ }) => {

  const { id } = useParams()
  const [isPlay, setIsPlay] = useState(false)

  const [broadcastData, setBroadcastData] = React.useState<any>(
    {} as IBroadcast,
  );

  const [current, setCurrent]: any = useState(broadcastData.name)

  const videoPleerRef = useRef<VideoPlayerHandle>();

  React.useEffect(() => {
    (async () => {
      const client = await getUpdateClient();
      await client
        .query({
          query: CURRENT_SERIAS,
          variables: { seriesId: Number(id) },
        })
        .then(res => {
          setBroadcastData(res.data.series);

        })
        .catch(e => {
          console.log(JSON.stringify(e, null, 2));
        })
    })();

  }, []);

  const setBroadcast = (data) => {
    setCurrent(data)
    setIsPlay(true)
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  useEffect(() => {
      videoPleerRef.current?.setStream({
        url: current.media.indexM3u8Url ?? '',
        media: { hls: current.media?.hls ?? [] },
      });
      setIsPlay(true)
  }, [current])



  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours ? hours + ' ч ' : '' + minutes + ' мин';
  };


  const blocks = broadcastData.seriesSeasons && broadcastData.seriesSeasons.length && broadcastData.seriesSeasons.map((data, key) => {
    return { title: `${key + 1} сезон`, block: <div><EpisodeSlider episodes={data.seriesEpisodes} setBroadcast={setBroadcast} /></div> }
  })

  return (
    <div>
      <div className={classes.broadcast}>
        {current ? <div className={classes.broadcast_player}><VideoPlayer ref={videoPleerRef}  isShowBtn={false} play={true}/></div>: <img className={classes.broadcast_img} src={broadcastData?.image?.url_1536} />}
        <div className={classes.broadcast_info}>
          <div className={classes.broadcast_info_title}>{current?.name ?? broadcastData.name}</div>
          <span className={classes.duration}>{getTimeFromMins(broadcastData.duration)} <span>/</span> {broadcastData.genre} </span>
          <div className={classes.language}>{broadcastData.language}</div>
          <div className={classes.broadcast_info_block}>
            <h2 className={classes.broadcast_info_content_title}>О передаче</h2>
            <div className={classes.broadcast_info_content}>{broadcastData.content}</div>
          </div>
          <div className={classes.broadcast_info_block}>
           <RatingNvk item={broadcastData}/>
          </div>
        </div>
      </div>
      {blocks && <div className={classes.broadcast_seasons}>
        <TransitionContainer
          withTitleBorder={true}
          classNameTitle={classes.broadcast_seasons_titles}
          classNameTitlesWrap={classes.broadcast_seasons_titles_wrp}
          blocks={blocks}>
        </TransitionContainer>
      </div>}
      {broadcastData.userVote&&broadcastData.userVote.length? <CommentSlider comments={broadcastData.userVote}/>: null}     
    </div>
  )
}

export default Serial
