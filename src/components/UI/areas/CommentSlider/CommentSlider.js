import React, { useRef } from 'react'
import classes from "./CommentSlider.module.scss"
import "./CommentSlider.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import useWindowSize from '../../../../hooks/useWindowSize'

function CommentSlider({ comments }) {
    const cls = [classes.slider, "last-search-slider"]

    const windowSize = useWindowSize()



    /**Инстенс свипера*/
    const swiperRef = useRef();

    const listEpisodes = comments.map((elem, id) => {

        return (
            <SwiperSlide>
      
            </SwiperSlide>
        )
    })

    return (
        <div className={classes.wrap}>
            <Swiper
                className={cls.join(" ")}
                direction={"horizontal"}
                spaceBetween={20}
                allowTouchMove={true}
                slidesPerView={windowSize.width <=523? 1: "auto"}
                navigation={true}
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {listEpisodes}
            </Swiper>
            <div className={classes.swiper_navigation}>
                <div onClick={() => swiperRef.current?.slidePrev()}>
                    <div className={classes.prev}></div>
                </div>
                <div onClick={() => swiperRef.current?.slideNext()}>
                    <div className={classes.next} />
                </div>
            </div>
        </div>
    )
}

export default CommentSlider