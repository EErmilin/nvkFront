import classes from "./FavoriteItem.module.scss";
import React from 'react';

function FavoriteItem({ }) {


    return (
        <div className={classes.favorite}>
            <div className={classes.favorite_img}></div>
            <div className={classes.favorite_title}>Белка и Стрелка. Озорная семейка</div>
        </div>
    )
}

export default FavoriteItem