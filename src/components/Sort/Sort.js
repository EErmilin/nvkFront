import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { GET_FILTER_COUNTRY, GET_FILTER_GENRE, GET_FILTER_LANGUAGE } from '../../gql/query/filters/filters';
import { getUpdateClient } from '../../requests/updateHeaders';
import classes from './Sort.module.scss'

const options = [
    { label: "По обновлению", value: "UPDATES" },
    { label: "По новизне", value: "NEW" },
    { label: "По просмотрам", value: "VIEWS" },
    { label: "По Кинопоиску", value: "KINOPOISK" },
]

export default function Sort({setSort, sort}) {
    if(!setSort)return
    return (
        <div className={classes.sort}>
            <Select className={classes.sort_select} showSearch placeholder={"Сортировать"} options={options} onChange={(value)=>setSort(value)} value={sort}/>
        </div>
    )
}