

import classes from "./ServiceItem.module.scss";
import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";



function ServiceItem({ crildren, service, type }: any) {

    const navigate = useNavigate()


    return (
        <div className={classes.item} onClick={()=>navigate(`/services/${type}/${service.id}`)}>
            <div className={classes.item_price}>
                {service.price} руб.
            </div>
            <div className={classes.item_title}>
                {service.name}
            </div>
            <div className={classes.item_text}>
                {service.preview}
            </div>
                <img src={service.images[0].url_1536} className={classes.item_img}/>
            {crildren}
        </div>
    )
}

export default ServiceItem