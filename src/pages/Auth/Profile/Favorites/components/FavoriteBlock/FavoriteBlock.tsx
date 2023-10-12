import classes from "./FavoriteBlock.module.scss";
import React, { useMemo } from 'react';
import FavoriteItem from "../FavoriteItem/FavoriteItem";
import { useAppSelector } from "../../../../../../redux/hooks";

function FavoriteBlock({type}: any) {
    const favorites = useAppSelector(state => state.favorite.favorites).filter(
        favorite =>
          type === 'podcast' || type === 'fairytale' || type === 'olonho'
            ? favorite.podcastEpisode !== null
            : favorite.song !== null,
      );
    
    return (
        <div className={classes.block}>
           {favorites.map((item, key)=><FavoriteItem key={key} item={type === "podcast" ? item.podcastEpisode : item.song}></FavoriteItem>)}
        </div>
    )
}

export default FavoriteBlock