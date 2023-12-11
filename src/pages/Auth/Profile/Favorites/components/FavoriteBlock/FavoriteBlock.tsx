import classes from "./FavoriteBlock.module.scss";
import React, { useMemo } from 'react';
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { useAppSelector } from "../../../../../../redux/hooks";
import { useQuery } from "@apollo/client";
import { SERIALS } from "../../../../../../gql/query/series/Series";
import { GET_MOVIES } from "../../../../../../gql/query/films/films";
import { MUSIC } from "../../../../../../gql/query/music/Music";
import { Spin } from "antd";

function FavoriteBlock({ type }: any) {
  const userId = useAppSelector(state => state.user.data?.id);


  const { data, loading, refetch } = useQuery(type === 'GET_MOVIES' ? GET_MOVIES : type==='SERIALS' ? SERIALS : MUSIC, {
    variables: {
      skip: 0,
      take: 10000,
      where: {
        favorites: {
          some: {
            userId,
          },
        },
      },
    },
  });

  const items = type === 'MUSIC'? data?.musics?.songs : type === 'GET_MOVIES' ? data?.movies : type==='SERIALS'? data?.serials: type === 'PODCASTS' ? data?.musics?.playlists : []


  return (
    <div className={classes.block}>
      {loading ? <Spin style={{marginTop: 100}}/> :items?.map((item, key) => <FavoriteItem key={key} item={item} type={type}></FavoriteItem>)}
    </div>
  )
}

export default FavoriteBlock