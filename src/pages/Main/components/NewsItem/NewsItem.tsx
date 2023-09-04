

import classes from "./NewsItem.module.scss";
import React from 'react';
import fakeNews from '../../../../assets/img/fakeNews.png';

function NewsItem({ }) {

    return (
        <div className={classes.news}>
            <div></div>
            <img className={classes.news_img} src={fakeNews}/>
            <div className={classes.news_title}>Участники сфур-2022 рассказали о новых разработках для адаптации человека в арктике</div>
            <div className={classes.news_date}>20.11.22 / Спорт</div>
        </div>
    )
}

export default NewsItem