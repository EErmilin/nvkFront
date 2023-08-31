import classes from "./Favorites.module.scss";
import React from 'react';
import TransitionContainer from "../../../../components/TransitionContainer/TransitionContainer";

function Favorites({ }) {

    const blocks = [
        {
            title: "Посты",
            block: null
        },
        {
            title: "Фильмы",
            block: null
        },
        {
            title: "Сериалы",
            block: null
        },
        {
            title: "Мультики",
            block: null
        },
        {
            title: "Передачи",
            block: null
        },
        {
            title: "Музыка",
            block: null
        },
        {
            title: "Подкасты",
            block: null
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