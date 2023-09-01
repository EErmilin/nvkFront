import { useEffect, useMemo, useState } from 'react';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from './AuthModal.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../../gql/mutation/auth/Login';
import { checkUserByPhone } from '../../../gql/mutation/auth/CheckUserByPhone';
import Input from '../../UI/areas/Input/Input';
import { useAppDispatch } from '../../../redux/hooks';
import { setUser } from '../../../redux/slices/userSlice';
import { setLogged, setToken } from '../../../redux/slices/authSlice';
import React from "react";


const AuthModal = ({ closeModal, btnCancelClick, setIsRegisterModal }: any) => {

    const navigate = useNavigate()
    const [error, setErrors] = useState(false)
    const [checkUser, userData] = useMutation(checkUserByPhone)
    const [login, loginData] = useMutation(LOGIN)
    const dispatcher = useAppDispatch()

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
        handleBlur,
        setTouched,
    } = useFormik({
        initialValues,
        validateOnMount: true,
        validationSchema,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    async function handleSubmit() {
        let response;
        try {
            response = await checkUser({ variables: { phone: values.phone } })
            if (response.data.checkUserByPhone) {
                response = await login({ variables: { loginInput: { phone: values.phone, password: values.password } } })
                if (response.data) {
                    dispatcher(setUser(response.data.login.user))
                    dispatcher(setToken(response.data.login.accessToken))
                    dispatcher(setLogged(true));
                    btnCancelClick()
                    navigate('/')
                }
            } else {
                setErrors(true)
            }
        } catch (error) {
            console.log('error')
            console.log(error)
        }

    }


    const handleRegister = () => {
        btnCancelClick()
        setIsRegisterModal(true)
    }

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field: any, value: any) {
        setErrors(false)
        handleChange({ target: { name: field, value: value } })
    }

    useEffect(() => {
        if (userData.error || loginData.error) setErrors(true)
    }, [userData.error, loginData.error])

    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={494}
        >
            <div className={classes.modal}>
                <div className={classes.modal_header}>
                    <h2>Вход</h2>
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
                        onChange={(e: any) => {
                            return ClearErrorAndChange("phone", e.target.value)
                        }}
                    />
                    < Input
                        placeholder='Пароль'
                        name="password"
                        id="password"
                        mask={''}
                        type={'password'}
                        value={values.password}
                        className={classes.modal_input}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("password", e.target.value)
                        }}
                    />
                    <NavLink to="/" className={classes.modal_form_text_gray}>Забыли пароль?</NavLink>
                    {error && <span className={classes.error}>Проверьте правильность введенных данных</span>}
                </form>
                <button
                    onClick={handleSubmit}
                    className={classes.modal_form_btn}
                >Авторизоваться</button>
            </div>
            <div className={classes.modal_form_link_wrp}>
                <div className={classes.modal_form_link} onClick={handleRegister}>Регистрация</div>
                <div className={classes.modal_form_link_gray} onClick={() => btnCancelClick()}>Пропустить</div>
            </div>
        </ModalWithBackground>
    );
};

export default AuthModal;

