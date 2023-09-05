

import classes from "./ShowItem.module.scss";
import React from 'react';
import fakeNews from '../../../../assets/img/fakeTop.png';

function ShowItem({ }) {

    return (
        <div className={classes.show}>
            <img className={classes.show_img} src={fakeNews}/>
            <div className={classes.show_title}>Мин таптыыр спутнигым</div>
        </div>
    )
}

export default ShowItem