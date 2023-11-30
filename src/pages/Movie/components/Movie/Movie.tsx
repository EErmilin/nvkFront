import React, { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getUpdateClient } from "../../../../requests/updateHeaders";
import classes from "./Movie.module.scss";

import { useLazyQuery } from "@apollo/client";
import { useState } from "react";
import CommentSlider from "../../../../components/UI/areas/CommentSlider/CommentSlider";
import VideoPlayer, {
  VideoPlayerHandle,
} from "../../../../components/VideoPleer/VideoPlayer";
import RatingNvk from "../../../../components/ratingNvk/ratingNvk";
import { GET_MOVIE } from "../../../../gql/query/films/films";
import { GET_MEDIA_ACCESS } from "../../../../gql/query/media/mediaAccess";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";
import { API_URL } from "../../../../api/config";
import { setModalVisible } from "../../../../redux/slices/routerSlice";

export const Movie = ({}) => {
  const { id } = useParams();

  const [movieData, setMovieData] = React.useState<any>(null);
  const user = useAppSelector((state) => state.user.data);
  const [access, setAccess] = useState(false);

  const videoPleerRef = useRef<VideoPlayerHandle>();

  React.useEffect(() => {
    (async () => {
      const client = await getUpdateClient();
      await client
        .query({
          query: GET_MOVIE,
          variables: { movieId: Number(id) },
        })
        .then((res) => {
          setMovieData(res.data.movie);
          setAccess(res.data.movieAccess);
        })
        .catch((e) => {
          console.log(JSON.stringify(e, null, 2));
        });
    })();
  }, []);

  useEffect(() => {
    if (access && movieData && videoPleerRef.current) {
      videoPleerRef.current.setStream({
        url: movieData.media?.indexM3u8Url ?? "",
        media: { hls: movieData.media?.hls ?? [] },
      });
    }
  }, [access]);

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + " ч " + minutes + " мин";
  }

  const dispatcher = useAppDispatch();

  const pay = useCallback(async () => {
    if (!user) {
      dispatcher(setModalVisible(true));
      return;
    }

    const res = await fetch(`${API_URL}/cloudpayments/pay-media`, {
      method: "POST",
      body: JSON.stringify({
        userId: user.id,
        movieId: movieData.id,
        redirectUrl: window.location.href,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((r) => r.json());

    if (res?.url) {
      window.location.href = res.url;
    }
  }, [user]);

  if (!movieData) {
    return <></>;
  }

  const imageUrl = movieData.image?.url_1536;

  return (
    <div>
      <div className={classes.broadcast}>
        <div style={{ flex: 1 }}>
          <VideoPlayer ref={videoPleerRef} play={false} isShowBtn={false}>
            <div
              className={classes.image_wrapper}
              style={{
                backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
              }}
            >
              {!access && (
                <ButtonDefault
                  title={`Смотреть за ${movieData.price}₽`}
                  onClick={pay}
                />
              )}
            </div>
          </VideoPlayer>
        </div>
        <div className={classes.broadcast_info}>
          <div className={classes.broadcast_info_title}>{movieData.name}</div>
          <span className={classes.duration}>
            {getTimeFromMins(movieData.duration)} <span>/</span>{" "}
            {movieData.genre}{" "}
          </span>
          <div className={classes.language}>{movieData.language}</div>
          <div className={classes.broadcast_info_block}>
            <h2 className={classes.broadcast_info_content_title}>О фильме</h2>
            <div className={classes.broadcast_info_content}>
              {movieData.content}
            </div>
          </div>
          <div className={classes.broadcast_info_block}>
            <RatingNvk item={movieData} />
          </div>
        </div>
      </div>
      {movieData.userVote && movieData.userVote.length ? (
        <CommentSlider comments={movieData.userVote} />
      ) : null}
    </div>
  );
};

export default Movie;
