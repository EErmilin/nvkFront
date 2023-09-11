import classes from "./FavoriteItem.module.scss";
import React from 'react';

function FavoriteItem({item }: any) {
    


    return (
        <div className={classes.favorite}>
            
            <div className={classes.favorite_img}> <img className={classes.favorite_img} src={item.artwork.url_256}/></div>
            <div className={classes.favorite_title}>{item.title}</div>
        </div>
    )
}

export default FavoriteItem