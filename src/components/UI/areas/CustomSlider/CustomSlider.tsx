import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";

function CustomSlider ({
    className,
    customSlide,
    customNavigationArrow,
    customPagination,
    slidesPerView,
    spaceBetween,
    onSlideChange,
    onSwiper,
    children,
    ...rest
} : any){
    const cls : any = []

    if(className)cls.push(className)

    const templateSlides = customSlide ? customSlide :<SwiperSlide />


    return (
        <Swiper
            className={cls.join(' ')}
            spaceBetween={spaceBetween}
            slidesPerView={slidesPerView}
            onSlideChange={onSlideChange}
            onSwiper={onSwiper}
            {...rest}
        >
            {templateSlides}
            !!!!!!!!!!
            {children&&children}
            
        </Swiper>
    )
}

export default CustomSlider