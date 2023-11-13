import { Select } from 'antd'
import { useFormik } from 'formik';
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

export default function Filter({ title, type, setFilters, setSort }) {
    const [genreOptions, setGenreOptions] = useState()
    const [languageOptions, setLanguageOptions] = useState()
    const [countryOptions, setCountryOptions] = useState()
    const currentYear = new Date().getFullYear();

    const yearsArray = Array.from(
        { length: currentYear - 2010 + 1 },
        (_, index) => { return { label: 2010 + index, value: 2010 + index } },
    );
    const ageOptions = [
        { value: 0, label: "0+" },
        { value: 6, label: "6+" },
        { value: 12, label: "12+" },
        { value: 16, label: "16+" },
        { value: 19, label: "19+" }
    ]

    const initialValues = {
        genre: null,
        language: null,
        country: null,
        year: null,
        age: null,
    };

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field, value) {
        handleChange({ target: { name: field, value: value } })
    }

    /** Стейт полей и правила */
    const { values, handleChange, touched, handleBlur, setTouched, setValues } = useFormik({
        initialValues,
        validateOnMount: true,
        onSubmit: (values) => {
            console.log(values);
        },
    });


    const update = React.useCallback(async () => { // Отрефачить ;)

        const client = await getUpdateClient();
        await client
            .query({
                query: GET_FILTER_GENRE,
                variables: {
                    type,
                },
            })
            .then(res => {
                setGenreOptions(res.data.filters.map((filter) => { return { label: filter.name, value: filter.name } }))
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            })
            .finally(() => {
            });

        await client
            .query({
                query: GET_FILTER_LANGUAGE,
                variables: {
                    type,
                },
            })
            .then(res => {
                setLanguageOptions(res.data.filters.map((filter) => { return { label: filter.name, value: filter.name } }))
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            })
            .finally(() => {
            });

        await client
            .query({
                query: GET_FILTER_COUNTRY,
                variables: {
                    type,
                },
            })
            .then(res => {
                setCountryOptions(res.data.filters.map((filter) => { return { label: filter.name, value: filter.name } }))
            })
            .catch(e => {
                console.log(JSON.stringify(e, null, 2));
            })
            .finally(() => {
            });
    }, []);


    React.useEffect(() => {
        (async () => {
            await update();
        })();
    }, [update]);

    useEffect(() => {
        setFilters && setFilters(values)
    }, [values])


    return (<>
        <div className={classes.filter}>
            <div className={classes.filter_title}>{title}</div>
            <p className={classes.filter_gray}>Вы любите смотреть фильмы онлайн и проводите много времени, прочесывая сайты в поисках чего-нибудь интересного? Стоит задержаться на nvk.ru – фильмы, которые собраны у нас, вам хватит надолго.</p>
            <div className={classes.filter_wrp}>
                <Select className={classes.filter_select}
                    showSearch placeholder={"Жанры"}
                    value={values.genre}
                    onSelect={(value, e) => {
                        return ClearErrorAndChange("genre", value)
                    }}
                    options={genreOptions} />
                <Select className={classes.filter_select}
                    value={values.year}
                    onSelect={(value, e) => {
                        return ClearErrorAndChange("year", value)
                    }}
                    showSearch placeholder={"Годы"}
                    options={yearsArray} />
                <Select className={classes.filter_select}
                    value={values.age}
                    onSelect={(value, e) => {
                        return ClearErrorAndChange("age", value)
                    }}
                    showSearch placeholder={"Возраст"}
                    options={ageOptions} />
                <Select className={classes.filter_select}
                    value={values.rating}
                    onSelect={(value, e) => {
                        return ClearErrorAndChange("rating", value)
                    }}
                    showSearch placeholder={"Рейтинг"} />
                <Select className={classes.filter_select}
                    value={values.language}
                    onSelect={(value, e) => {
                        return ClearErrorAndChange("language", value)
                    }}
                    showSearch
                    placeholder={"Язык"}
                    options={languageOptions} />
                <Select className={classes.filter_select}
                    value={values.country}
                    onSelect={(value, e) => {
                        return ClearErrorAndChange("country", value)
                    }}
                    showSearch placeholder={"Страны"}
                    options={countryOptions} />
            </div>
           {<div onClick={() => {setValues(initialValues); setSort(null)}} className={classes.clear}>Сбросить</div>}
        </div>
        <Sort setSort={setSort}/>
    </>
    )
}