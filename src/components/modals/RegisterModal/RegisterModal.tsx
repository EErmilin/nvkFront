import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from './AuthModal.module.scss';
import { NavLink } from 'react-router-dom';


const AuthModal = ({ closeModal, btnCancelClick  }: any) => {

    /** Начальные значения */
    const initialValues = {
        phone: '',
        password: "",
    };

    /** Схема валидации */
    const validationSchema = useMemo(
        () =>
            object().shape({
                phone: string().required(),
                password: string().required(),
            }),
        []
    );


    /** Стейт полей и правила */
    const {
        values,
        handleChange,
        handleSubmit,
        touched,
    } = useFormik({
        initialValues,
        validateOnMount: true,
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    const onChangePhone = (event: any) => {
        handleChange({ target: { name: "phone", value: event.target.value } })
    }

    const onChangePassword = (event: any) => {
        handleChange({ target: { name: "password", value: event.target.value } })
    }

    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={494}
        >
            <div className={classes.modal}>
                <div className={classes.modal_header}>
                    <h3>Вход</h3>
                    <span className={classes.modal_header_btn_return}>Вернуться</span>
                </div>
                <form className={classes.modal_form}>
                    <p>С помощью телефона</p>
                    <ReactInputMask
                        name="phone"
                        placeholder='+7'
                        id="phone"
                        className={classes.modal_input}
                        mask={"+7 (999) 999-99-99"}
                        value={values.phone}
                        onChange={(event) => onChangePhone(event)}
                        required
                    />
                    <ReactInputMask
                        placeholder='Пароль'
                        name="password"
                        id="password"
                        mask={''}
                        type={'password'}
                        value={values.password}
                        className={classes.modal_input}
                        onChange={(event) => onChangePassword(event)}
                        required
                    />
                    <NavLink to="/" className={classes.modal_form_text_gray}>Забыли пароль?</NavLink>
                    <button
                        className={classes.modal_form_btn}
                    >Авторизоваться</button>
                </form>

            </div>
            <div className={classes.modal_form_link_wrp}>
                <NavLink className={classes.modal_form_link} to="/">Регистрация</NavLink>
                <NavLink className={classes.modal_form_link_gray} to="/">Пропустить </NavLink>
            </div>
        </ModalWithBackground>
    );
};

export default AuthModal;

