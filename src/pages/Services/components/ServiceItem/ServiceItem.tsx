

import classes from "./ServiceItem.module.scss";
import React from 'react';
import { NavLink } from "react-router-dom";



function ServiceItem({ crildren, service }: any) {


    return (
        <div className={classes.item}>
            <div className={classes.item_price}>
                {service.price} руб.
            </div>
            <NavLink className={classes.item_title} to={`/services/${service.id}`}>
                {service.title}
            </NavLink>
            <div className={classes.item_text}>
                {service.text}
            </div>
            <div className={classes.item_img}>
                <img src={service.img} />
            </div>
            {crildren}
        </div>
    )
}

export default ServiceItem