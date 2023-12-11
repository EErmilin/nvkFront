import classes from "./Favorites.module.scss";
import React, { useEffect, useState } from 'react';
import TransitionContainer from "../../../../components/TransitionContainer/TransitionContainer";
import FavoriteBlock from "./components/FavoriteBlock/FavoriteBlock";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchFavorite } from "../../../../redux/thunks/favorite/GetFavorites";


function Favorites({ }) {

    

    const blocks = [
        {
            title: "Сериалы",
            block: <FavoriteBlock type="SERIALS"/>
        },
        {
            title: "Фильмы",
            block: <FavoriteBlock type="GET_MOVIES"/>
        },
        {
            title: "Музыка",
            block: <FavoriteBlock type="MUSIC"/>
        },
        {
            title: "Подкасты",
            block: <FavoriteBlock type="PODCASTS"/>
        },
    ]



    return (
        <div className={classes.favorites}>
            <h2>Избранное</h2>
            <TransitionContainer
                withTitleBorder={true}
                classNameTitlesWrap={classes.favorites_titles}
                blocks={blocks}>
                    
            </TransitionContainer>
        </div>
    )
}

export default Favorites