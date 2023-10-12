import React, { useEffect, useRef } from "react"
import classes from "./Broadcast.module.scss";
import { IBroadcast, IEpisodeBroadcast, IHlsBroadcast, ISeasonBroadcast } from '../../../../models/Broadcast';
import { BROADCAST } from "../../../../gql/query/broadcast/Broadcast";
import { getUpdateClient } from "../../../../requests/updateHeaders";
import { useParams } from "react-router-dom";

import VideoPlayer, { VideoPlayerHandle } from "../../../../components/VideoPleer/VideoPlayer";
import TransitionContainer from "../../../../components/TransitionContainer/TransitionContainer";
import { useState } from "react";
import EpisodeSlider from "../../../../components/UI/areas/EpisodeSlider/EpisodeSlider";


export const Broadcast = ({ }) => {

  const { id } = useParams()
  const [duration, setDuration] = React.useState(0);
  const [isPlay, setIsPlay] = useState(false)




  const [broadcastData, setBroadcastData] = React.useState<IBroadcast>(
    {} as IBroadcast,
  );

  const [current, setCurrent]: any = useState(broadcastData.name)

  const videoPleerRef = useRef<VideoPlayerHandle>();


  React.useEffect(() => {
    (async () => {
      const client = await getUpdateClient();
      await client
        .query({
          query: BROADCAST,
          variables: { showId: Number(id) },
        })
        .then(res => {
          setBroadcastData(res.data.show);
          const startEpisode: IEpisodeBroadcast = res.data.show.seasons
            ?.sort(
              (a: ISeasonBroadcast, b: ISeasonBroadcast) => a.number - b.number,
            )[0]
            ?.episodes?.sort(
              (a: IEpisodeBroadcast, b: IEpisodeBroadcast) =>
                a.number - b.number,
            )[0];
          videoPleerRef.current?.setStream({
            url: startEpisode?.media?.indexM3u8Url ?? '',
            hls: startEpisode?.media?.hls ?? [],
          });
          setDuration(startEpisode?.duration);
        })
        .catch(e => {
          console.log(JSON.stringify(e, null, 2));
        })
    })();

  }, [isPlay]);

  const setBroadcast = (data) => {

    setCurrent(data)


    videoPleerRef.current?.setStream({
      url: data?.media?.indexM3u8Url ?? '',
      media: {hls: data?.media?.hls ?? []},
    });
    setIsPlay(true)
  }


  const blocks = broadcastData.seasons && broadcastData.seasons.length && broadcastData.seasons.map((data, key) => {

    return { title: `${key + 1} сезон`, block: <div><EpisodeSlider episodes={data.episodes} setBroadcast={setBroadcast} /></div> }
  })
  return (
    <div>
      <div className={classes.broadcast}>
        {isPlay ? <VideoPlayer ref={videoPleerRef} play={true} isShowBtn={false} /> : <img className={classes.broadcast_img} src={broadcastData?.image?.url_1536} />}
        <div className={classes.broadcast_info}>
          <div className={classes.broadcast_info_title}>{current?.name }</div>
          <div>{duration}</div>
          <div className={classes.broadcast_info_block}>
            <h2 className={classes.broadcast_info_content_title}>О передаче</h2>
            <div className={classes.broadcast_info_content}>{broadcastData.content}</div>
          </div>
        </div>

      </div>
      {blocks && <div className={classes.broadcast_seasons}>
        <TransitionContainer
          withTitleBorder={true}
          classNameTitle={classes.broadcast_seasons_titles}
          blocks={blocks}>
        </TransitionContainer>
      </div>}
    </div>
  )
}

export default Broadcast
