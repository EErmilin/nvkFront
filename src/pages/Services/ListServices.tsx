

import classes from "./ListServices.module.scss";
import React, { useMemo } from 'react';
import service1 from '../../assets/img/service1.svg';
import service2 from '../../assets/img/service2.svg';
import serviceTV from '../../assets/img/serviceTV.svg';
import ServiceItem from "./components/ServiceItem/ServiceItem";

const fakeServices = [
    {
        id: 0,
        price: "3 000",
        title: "Истиҥ илдьит",
        text: "«Истиҥ илдьит» биэриигэ эҕэрдэ сыаната: — 50 тылга диэри 3 000 солкуобай;— 50 тылтан элбэх...",
        img: service1
    },
    {
        id: 0,
        price: 0,
        title: "Помним, скорбим Кэриэстэбил",
        text: "Сообщения о гражданских панихидах выходят на ваш выбор на телеканалах НВК «Саха», «Якутия 24»...",
        img: service2
    },
    {
        id: 0,
        price: "4 250",
        title: "Реклама на телевидении",
        text: "Рекламное агентство НВК “Саха” оказывает услуги по изготовлению и размещению ваших рекламных...",
        img: serviceTV
    }
]




function ListServices({ }) {

    const templateServices = useMemo(() => {
        return fakeServices.map((service: any, key: number) => {
            return <ServiceItem service={service}/>
        })
    }, [fakeServices])



    return (
        <div className={classes.servises}>

{templateServices}

        </div>
    )
}

export default ListServices