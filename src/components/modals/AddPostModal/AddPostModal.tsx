
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import classes from './AddPostModal.module.scss';
import React from 'react';
import Slider from '../../UI/areas/CustomSlider/CustomSlider';
import { SwiperSlide } from "swiper/react";
import Avatar from '../../Avatar/Avatar';
import Input from '../../UI/areas/Input/Input';
import CustomTextArea from '../../UI/areas/CustomTextArea/CustomTextArea';
import { useFormik } from 'formik';
import ButtonDefault from '../../UI/btns/Button/Button';
import { useDispatch } from 'react-redux';
import { publishPost } from '../../../redux/thunks/post/PublishPost';




const AddPostModal = ({ closeModal, btnCancelClick, }: any) => {

    const dispatcher = useDispatch()
    /** Начальные значения */
    const initialValues = {

        comment: "",

    };


    /** Стейт полей и правила */
    const { values, handleChange, touched } = useFormik({
        initialValues,
        validateOnMount: true,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field, value) {
        handleChange({ target: { name: field, value: value } })
    }

    const onSumbit = async () => {
        try {
            const res = await dispatcher(await publishPost());
            if (res.meta.requestStatus === 'fulfilled') {
            }
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={1024}
            className={classes.modal}>
            <div className={classes.modal}>
                <Input placeholder={'Заголовок'}></Input>
                <CustomTextArea
                    classNameInputWrap={classes.modal_area}
                    placeholder={'Описание'}
                    onChange={(event) => ClearErrorAndChange("comment", event.target.value)}>

                </CustomTextArea>
                <ButtonDefault title={'Создать пост'} />
            </div>
        </ModalWithBackground>
    );
};

export default AddPostModal;

