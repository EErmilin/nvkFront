import classes from "./FavoriteItem.module.scss";
import React, { useState } from 'react';

function FavoriteItem({item }: any) {

    const [isNoImg, setIsNoImg] = useState(false)
    


    return (
        <div className={classes.favorite}>
            
            <div className={classes.favorite_img}>{isNoImg? <div className={classes.favorite_noImg}/>: <img className={classes.favorite_img} src={item.artwork.url_256} onError={()=>setIsNoImg(true)}/>}</div>
            <div className={classes.favorite_title}>{item.title}</div>
        </div>
    )
}

export default FavoriteItem