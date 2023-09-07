import classes from "./Favorites.module.scss";
import React from 'react';
import TransitionContainer from "../../../../components/TransitionContainer/TransitionContainer";
import FavoriteBlock from "./components/FavoriteBlock/FavoriteBlock";


function Favorites({ }) {

    const blocks = [
        {
            title: "Посты",
            block: <FavoriteBlock/>
        },
        {
            title: "Передачи",
            block: <FavoriteBlock/>
        },
        {
            title: "Музыка",
            block: <FavoriteBlock/>
        },
        {
            title: "Подкасты",
            block: <FavoriteBlock/>
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