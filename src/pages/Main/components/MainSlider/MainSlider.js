import React from 'react'
import classes from "./MainSlider.module.scss";
import { SwiperSlide } from "swiper/react";
import fakeSlide from '../../../../assets/img/fakeSlide.png';
import 'swiper/swiper-bundle.css';
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "../MainSlider/swiper.scss";
import CustomSlider from '../../../../components/UI/areas/CustomSlider/CustomSlider';

function MainSlider({
}) {
    return (
        <div className={classes.swiper}>
            <CustomSlider>
                <SwiperSlide><img className={classes.swiper_img} src={fakeSlide} /></SwiperSlide>
                <SwiperSlide><img className={classes.swiper_img} src={fakeSlide} /></SwiperSlide>
                <SwiperSlide><img className={classes.swiper_img} src={fakeSlide} /></SwiperSlide>
                <SwiperSlide><img className={classes.swiper_img} src={fakeSlide} /></SwiperSlide>
            </CustomSlider>
        </div>
    );
}

export default MainSlider