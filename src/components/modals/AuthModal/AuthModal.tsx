import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from './AuthModal.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../../../gql/mutation/auth/Login';
import { PROFILE } from '../../../gql/query/user/Profile';
import { checkUserByPhone } from '../../../gql/mutation/auth/CheckUserByPhone';
import Input from '../../UI/areas/Input/Input';


const AuthModal = ({ closeModal, btnCancelClick, setIsRegisterModal }: any) => {

    const navigate = useNavigate()
    const { loading, error, data } = useQuery(PROFILE)
    const [checkUser] = useMutation(checkUserByPhone)
    const [login] = useMutation(LOGIN)

    /** Начальные значения */
    const initialValues = {
        phone: "",
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
        touched,
    } = useFormik({
        initialValues,
        validateOnMount: true,
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    const handleSubmit = (event: any) => {
        checkUser({ variables: { phone: values.phone } })
        login({ variables: { loginInput: { phone: values.phone, password: values.password } } })
        navigate('/')
        event.preventDefault()
    }

    const handleRegister = () => {
        btnCancelClick()
        setIsRegisterModal(true)
    }

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
                    <Input
                        label={'С помощью телефона'}
                        name="phone"
                        placeholder='+7'
                        id="phone"
                        className={classes.modal_input}
                        mask={"+7 (999) 999-99-99"}
                        value={values.phone}
                        onChange={(event: any) => onChangePhone(event)}
                        required
                    />
                    < Input
                        placeholder='Пароль'
                        name="password"
                        id="password"
                        mask={''}
                        type={'password'}
                        value={values.password}
                        className={classes.modal_input}
                        onChange={(event: any) => onChangePassword(event)}
                        required
                    />
                    <NavLink to="/" className={classes.modal_form_text_gray}>Забыли пароль?</NavLink>
                    <button
                        onClick={handleSubmit}
                        className={classes.modal_form_btn}
                    >Авторизоваться</button>
                </form>

            </div>
            <div className={classes.modal_form_link_wrp}>
                <div className={classes.modal_form_link} onClick={handleRegister}>Регистрация</div>
                <div className={classes.modal_form_link_gray} onClick={btnCancelClick}>Пропустить </div>
            </div>
        </ModalWithBackground>
    );
};

export default AuthModal;

