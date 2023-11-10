import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { GET_FILTER_COUNTRY, GET_FILTER_GENRE, GET_FILTER_LANGUAGE } from '../../gql/query/filters/filters';
import { getUpdateClient } from '../../requests/updateHeaders';
import classes from './Sort.module.scss'

const options = [
    { label: "По обновлению", value: 0 },
    { label: "По новизне", value: 1 },
    { label: "По просмотрам", value: 2 },
    { label: "По Кинопоиску", value: 3 },
]

export default function Sort() {
    return (
        <div className={classes.sort}>
            <Select className={classes.sort_select} showSearch placeholder={"Сортировать"} options={options} />
        </div>
    )
}