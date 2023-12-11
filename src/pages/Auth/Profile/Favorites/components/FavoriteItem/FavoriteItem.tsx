import classes from "./FavoriteItem.module.scss";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function FavoriteItem({ item, type }: any) {

    const navigate = useNavigate()

    const [isNoImg, setIsNoImg] = useState(false)

    const cls = [classes.favorite]
    if (type === 'SERIALS') {
        console.log('!!!!!!!!!!!!!!')
        cls.push(classes.favorite_serials)
    }

    if (type === 'GET_MOVIES') {
        cls.push(classes.favorite_movie)
    }

    const link = type === 'SERIALS' ? '/serials' : type === 'GET_MOVIES' ? '/movies' : '/audio'

    if (!item) return null
    return (
        <div onClick={() => navigate(link)} className={cls.join(' ')}>
            <div className={classes.favorite_img}>{isNoImg ? <div className={classes.favorite_noImg} /> : <img className={classes.favorite_img} src={item.image?.url || item?.artwork?.url_256} onError={() => setIsNoImg(true)} />}</div>
            <div className={classes.favorite_title}>{item?.title}</div>
        </div>
    )
}

export default FavoriteItem
