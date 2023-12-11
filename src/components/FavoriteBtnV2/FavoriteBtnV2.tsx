import React, { useEffect } from "react";
import { fetchFavoriteIds } from "../../gql/query/favorites/GetFavoriteIds";
import { useFavorite } from "../../helpers/useFavorite";
import { ISongType } from "../../models/Music";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLogged } from "../../redux/slices/authSlice";
import { createFavorite } from "../../redux/thunks/favorite/CreateFavorite";
import { removeFavorite } from "../../redux/thunks/favorite/RemoveFavorite";
import classes from "./FavoriteBtnV2.module.scss";


function FavoriteBtnV2({ id, type }: any) {
  const { isFavorite, toggle } = useFavorite({ [type]: id });
  const dispatch = useAppDispatch();

  const token = useAppSelector(state => state.auth.token);
  const cls = [classes.btn]

  if (isFavorite) {
    cls.push(classes.btn_active)
  }

  return (
    <div className={cls.join(" ")} onClick={async () => {
      if (token) {
        toggle()
      } else {
        dispatch(setLogged(false));
      }
    }}>
    </div>
  )
}

export default FavoriteBtnV2