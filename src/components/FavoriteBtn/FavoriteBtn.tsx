import React from "react";
import { useFavorite } from "../../helpers/useFavorite";
import { ISongType } from "../../models/Music";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLogged } from "../../redux/slices/authSlice";
import { createFavorite } from "../../redux/thunks/favorite/CreateFavorite";
import { removeFavorite } from "../../redux/thunks/favorite/RemoveFavorite";
import classes from "./FavoriteBtn.module.scss";

const useFavoriteAudio = (type: ISongType) => {
  const favorites = useAppSelector(state => state.favorite.favorites).filter(
    favorite =>
      type === 'podcast' || type === 'fairytale' || type === 'olonho'
        ? favorite.podcastEpisode !== null
        : favorite.song !== null,
  );

  return favorites;
};


function FavoriteBtn({ id, type, favorites }: any) {
  const { isFavorite, toggle } = useFavorite({ songId: id }); // TODO: убрать отдельные запросы для элементов музыки .. для отдельных компонентов создан компонентр FavoriteBtnV2
  const dispatch = useAppDispatch();
  const [like, setLike] = React.useState(favorites?.map(favorite => favorite.id));

  const token = useAppSelector(state => state.auth.token);
  const cls = [classes.btn]

  if (like) {
    cls.push(classes.btn_active)
  }

  return (
    <div className={cls.join(" ")} onClick={async () => {
      if (token) {
        if (like) {
          let idFavorite =
            type !== 'fairytale' && type !== 'olonho' && type !== 'podcast'
              ? favorites.find(favorite => favorite.song?.id === id)?.id
              : favorites.find(favorite => favorite.podcastEpisode?.id === id)
                ?.id;
          if (idFavorite) {
            setLike(false);
            let response = await dispatch(removeFavorite(idFavorite));
            if (response.meta.requestStatus === 'rejected') {
              setLike(true);
            }
          }
        } else {
          setLike(true);
          let response = await dispatch(
            createFavorite({
              songId:
                type !== 'podcast' &&
                  type !== 'radio' &&
                  type !== 'fairytale' &&
                  type !== 'olonho'
                  ? id
                  : undefined,
              podcastEpisodeId:
                type === 'fairytale' ||
                  type === 'olonho' ||
                  type === 'podcast'
                  ? id
                  : undefined,
            }),
          );
          if (response.meta.requestStatus === 'rejected') {
            setLike(false);
          }
        }
      } else {
        dispatch(setLogged(false));
      }
    }}>

    </div>
  )
}

export default FavoriteBtn