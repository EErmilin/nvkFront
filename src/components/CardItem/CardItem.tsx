import React, { useState } from "react";
import classes from "./CardItem.module.scss";
import ReactInputMask from 'react-input-mask';


function CardItem({

}) {


    return (
        <div className={classes.card}>
            <div>
                <div className={classes.card_number}>Карта **** **** **** 3862</div>
                <div className={classes.card_date}>Добавлено 29.11.2022</div>
            </div>
            <div className={classes.card_icon_mir} />
        </div>
    );
}

export default CardItem