import { FC, useMemo, useRef } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import React from 'react'
import "./swiper.scss";

import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  EffectCoverflow,
  EffectCube,
} from "swiper";
import NavigationBtn from '../../btns/NavigationBtn/NavigationBtn';
import classes from "./CustomSlider.module.scss";

const breakpoints = {
  1100: {
    slidesPerView: 4,
  },
  768: {
    slidesPerView: 3,
  },
  464: {
    slidesPerView: 2,
  },
};

SwiperCore.use([
  EffectCoverflow,
  EffectCube,
  EffectFade,
  Navigation,
  Pagination,
]);

const Slider = ({ children, className, isShowBtns = true }) => {

  /**Инстенс свипера*/
  const swiperRef = useRef();

  /**Стили*/
  const cls = [classes.swiper]
  if (className) cls.push(className)
  return (
    <div className={classes.swiper}>
      <Swiper
        pagination={true}
        className={cls.join(' ')}
        slidesPerView={1}
        spaceBetween={20}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        navigation
      >
        {children}
      </Swiper>
      {isShowBtns && <div className={classes.swiper_navigation}>
        <div onClick={() => swiperRef.current?.slidePrev()}>
          <NavigationBtn type="prev" />
        </div>
        <div onClick={() => swiperRef.current?.slideNext()}>
          <NavigationBtn type="next" />
        </div>
      </div>}
    </div>
  );
};

export default Slider;