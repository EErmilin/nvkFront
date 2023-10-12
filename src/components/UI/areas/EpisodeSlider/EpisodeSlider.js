import React, { useRef } from 'react'
import classes from "./EpisodeSlider.module.scss"
import "./EpisodeSlider.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"

function EpisodeSlider({ episodes, setBroadcast }) {
    const cls = [classes.slider, "last-search-slider"]


    /**Инстенс свипера*/
    const swiperRef = useRef();

    const listEpisodes = episodes.map((elem, id) => {

        return (
            <SwiperSlide key={id} className={classes.slide} onClick={()=>setBroadcast(elem)}>
                <div className={classes.mask_wrp}>
                <div className={classes.mask}>
                <img className={classes.img} src={elem.media?.covers[0]?.url_256} />
                </div>
                </div>
                <div className={classes.slide_name}>{elem.name}</div>
                <div className={classes.slide_gray}>{elem.duration}</div>
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
                slidesPerView={"auto"}
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

export default EpisodeSlider