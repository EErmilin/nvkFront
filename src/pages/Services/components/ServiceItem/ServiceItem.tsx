

import classes from "./ServiceItem.module.scss";
import React from 'react';
import { NavLink } from "react-router-dom";



function ServiceItem({ crildren, service, type }: any) {


    return (
        <div className={classes.item}>
            <div className={classes.item_price}>
                {service.price} руб.
            </div>
            <NavLink className={classes.item_title} to={`/services/${type}/${service.id}`}>
                {service.name}
            </NavLink>
            <div className={classes.item_text}>
                {service.preview}
            </div>
                <img src={service.images[0].url_1536} className={classes.item_img}/>
            {crildren}
        </div>
    )
}

export default ServiceItem