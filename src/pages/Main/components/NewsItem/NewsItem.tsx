

import classes from "./NewsItem.module.scss";
import React, { useState } from 'react';
import fakeNews from '../../../../assets/img/fakeNews.png';
import moment from "moment";

function NewsItem({post}: any) {

    const [isNoImg, setIsNoImg] = useState(false)
    const date = moment(post.updatedAt).format("DD.MM.YY")

    return (
        <div className={classes.news}>
            <div className={classes.news_img}>
            {isNoImg? <div className={classes.news_img}/>: <img className={classes.news_img} src={post?.images[0]?.url} onError={() => setIsNoImg(true)}/>}
            </div>
            <div className={classes.news_title}>{post.title}</div>
            <div className={classes.news_date}>{date}</div>
        </div>
    )
}

export default NewsItem