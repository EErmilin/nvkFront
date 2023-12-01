
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import classes from './PostModal.module.scss';
import React from 'react';
import Slider from '../../UI/areas/CustomSlider/CustomSlider';
import { SwiperSlide } from "swiper/react";
import Avatar from '../../Avatar/Avatar';




const PostModal = ({ closeModal, btnCancelClick, post, authorData }: any) => {

    const tempalteImages = post.images?.map((item, key) => <SwiperSlide key={key}><img className={classes.img} src={item.url} /></SwiperSlide>)

    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={1254}
            className={classes.modal}>
            <div className={classes.modal}>
                <div className={classes.slider}>
                    <Slider className={classes.slider_img} isShowBtns={false}>
                        {tempalteImages}
                    </Slider>
                </div>
                <div className={classes.modal_comments}>
                    <div className={classes.modal_comments_header}>
                        <Avatar
                            width={50}
                            height={50}
                            avatar={null}
                            className={classes.avatar}
                        ></Avatar>
                        <div>{authorData.author.nickname}</div>
                    </div>
                </div>
            </div>
        </ModalWithBackground>
    );
};

export default PostModal;

