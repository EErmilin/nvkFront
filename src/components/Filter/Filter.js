import { Select } from 'antd'
import React from 'react'
import classes from './Filter.module.scss'

export default function Filter({title}) {



    return (
        <div className={classes.filter}>
            <div className={classes.filter_title}>{title}</div>
            <p className={classes.filter_gray}>Вы любите смотреть фильмы онлайн и проводите много времени, прочесывая сайты в поисках чего-нибудь интересного? Стоит задержаться на nvk.ru – фильмы, которые собраны у нас, вам хватит надолго.</p>
            <div className={classes.filter_wrp}>
                <Select className={classes.filter_select} showSearch placeholder={"Жанры"} />
                <Select className={classes.filter_select} showSearch placeholder={"Годы"} />
                <Select className={classes.filter_select} showSearch placeholder={"Возраст"} />
                <Select className={classes.filter_select} showSearch placeholder={"Рейтинг "} />
                <Select className={classes.filter_select} showSearch placeholder={"По просмотру"} />
            </div>
        </div>
    )
}