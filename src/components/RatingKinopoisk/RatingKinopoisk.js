import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './RatingKinopoisk.module.scss'

export default function RatingKinopoisk({item }) {


    return (
        <div className={classes.rating}>
            <div className={classes.rating_wrp}>
                <div className={classes.rating_number}>{item.ratingKinopoisk}</div>
                <div>
                    <div className={classes.rating_title}>Рейтинг Кинопоиск</div>
                    <div className={classes.rating_gray}></div>
                </div>
            </div>
            <NavLink  className={classes.rating_btn} to={item.kinoPoisk_url} arget="_blank">Перейти</NavLink>
        </div>
    )
}