import classes from "./FavoriteBlock.module.scss";
import React from 'react';
import FavoriteItem from "../FavoriteItem/FavoriteItem";

function FavoriteBlock({ }) {


    return (
        <div className={classes.block}>
            <FavoriteItem></FavoriteItem>
            <FavoriteItem></FavoriteItem>
        </div>
    )
}

export default FavoriteBlock