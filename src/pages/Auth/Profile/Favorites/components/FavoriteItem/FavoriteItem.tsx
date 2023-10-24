import classes from "./FavoriteItem.module.scss";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function FavoriteItem({ item }: any) {

    const navigate = useNavigate()

    const [isNoImg, setIsNoImg] = useState(false)
    if (!item) return null
    return (
        <div onClick={()=>navigate("/audio")} className={classes.favorite}>
            <div className={classes.favorite_img}>{isNoImg || !item?.artwork?.url_256 ? <div className={classes.favorite_noImg} /> : <img className={classes.favorite_img} src={item?.artwork?.url_256} onError={() => setIsNoImg(true)} />}</div>
            <div className={classes.favorite_title}>{item?.title}</div>
        </div>
    )
}

export default FavoriteItem