import { Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { GET_FILTER_COUNTRY, GET_FILTER_GENRE, GET_FILTER_LANGUAGE } from '../../gql/query/filters/filters';
import { getUpdateClient } from '../../requests/updateHeaders';
import Sort from '../Sort/Sort';
import classes from './Filter.module.scss'

const documents = [
    GET_FILTER_GENRE,
    GET_FILTER_LANGUAGE,
    GET_FILTER_COUNTRY,
];

export default function Filter({ title, type }) {
    const [genreOptions, setGenreOptions] = useState()
    const [languageOptions, setLanguageOptions] = useState()
    const [countryOptions, setCountryOptions] = useState()
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from(
        { length: currentYear - 2010 + 1 },
        (_, index) => { return { label: 2010 + index, value: 2010 + index } },
    );
    const ageOptions = [
        {value:0, label:"0+"},
        {value:6, label:"6+"},
        {value:12, label:"12+"},
        {value:16, label:"16+"},
        {value:19, label:"19+"}
    ]
    const getFilter = async (filter) => { // Переписать на useQvery
        const client = await getUpdateClient();
        await client
            .query({
                query: filter,
                variables: {
                    type,
                },
            })
            .then(res => {
                if (filter === GET_FILTER_GENRE) {
                    setGenreOptions(res.data.filters.map((filter) => { return { label: filter.name, value: filter.name } }))
                }
                if(filter===GET_FILTER_LANGUAGE){
                    setLanguageOptions(res.data.filters.map((filter) => { return { label: filter.name, value: filter.name } }))
                }
                if(filter===GET_FILTER_COUNTRY){
                    setCountryOptions(res.data.filters.map((filter) => { return { label: filter.name, value: filter.name } }))
                }
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            })
            .finally(() => {
            });
    }

    return (<>
        <div className={classes.filter}>
            <div className={classes.filter_title}>{title}</div>
            <p className={classes.filter_gray}>Вы любите смотреть фильмы онлайн и проводите много времени, прочесывая сайты в поисках чего-нибудь интересного? Стоит задержаться на nvk.ru – фильмы, которые собраны у нас, вам хватит надолго.</p>
            <div className={classes.filter_wrp}>
                <Select className={classes.filter_select} showSearch placeholder={"Жанры"} onClick={() => getFilter(GET_FILTER_GENRE)} options={genreOptions} />
                <Select className={classes.filter_select} showSearch placeholder={"Годы"} options={yearsArray} />
                <Select className={classes.filter_select} showSearch placeholder={"Возраст"}  options={ageOptions}/>
                <Select className={classes.filter_select} showSearch placeholder={"Рейтинг"} />
                <Select className={classes.filter_select} showSearch placeholder={"Язык"} onClick={() => getFilter(GET_FILTER_LANGUAGE)} options={languageOptions}/>
                <Select className={classes.filter_select} showSearch placeholder={"Страны"} onClick={() => getFilter(GET_FILTER_COUNTRY)} options={countryOptions}/>
            </div>
        </div>
        <Sort/>
        </>
    )
}