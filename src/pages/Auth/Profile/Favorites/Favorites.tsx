import classes from "./Favorites.module.scss";
import React, { useEffect } from 'react';
import TransitionContainer from "../../../../components/TransitionContainer/TransitionContainer";
import FavoriteBlock from "./components/FavoriteBlock/FavoriteBlock";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { fetchFavorite } from "../../../../redux/thunks/favorite/GetFavorites";


function Favorites({ }) {
    const dispatcher = useAppDispatch()
    const token = useAppSelector(state => state.auth.token);
    

    const blocks = [
        {
            title: "Посты",
            block: <FavoriteBlock type="fairytale"/>
        },
        {
            title: "Передачи",
            block: <FavoriteBlock type="fairytale"/>
        },
        {
            title: "Музыка",
            block: <FavoriteBlock type="music"/>
        },
        {
            title: "Подкасты",
            block: <FavoriteBlock type="fairytale"/>
        },
    ]

    useEffect(()=>{
        dispatcher(fetchFavorite(token));
    },[])



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