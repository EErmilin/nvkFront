import React, { useRef } from 'react'
import classes from "./CommentSlider.module.scss"
import "./CommentSlider.scss"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper"
import useWindowSize from '../../../../hooks/useWindowSize'
import moment from 'moment'

function CommentSlider({ comments }) {
    const cls = [classes.slider, "last-search-slider"]

    const windowSize = useWindowSize()


    /**Инстенс свипера*/
    const swiperRef = useRef();

    const listComments = comments.map((elem, id) => {
        console.log('!!!!!!!!!')
        console.log(elem)
        return (
            <SwiperSlide key={id}>
                <div className={classes.comment}>
                    <div className={classes.comment_info}>
                        <img className={classes.comment_avatar} src={elem.user.avatar?.url}></img>
                        {elem.user && <div> <span>{elem.user?.firstname}</span> <span>{elem.user?.lastname}</span></div>}
                    </div>
                    <div className={classes.comment_text}>{elem.comment}</div>
                    <div className={classes.comment_date}>{moment(elem.updatedAt).format("DD MMMM YYYY, HH:MM")}</div>
                </div>

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
                slidesPerView={windowSize.width <= 523 ? 1 : "auto"}
                navigation={true}
                modules={[Navigation]}
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
            >
                {listComments}
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