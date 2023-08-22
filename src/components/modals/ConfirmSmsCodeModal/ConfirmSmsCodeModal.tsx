import React, { Dispatch, SetStateAction, useEffect, useMemo, useRef, useState } from 'react';
import ReactInputMask from 'react-input-mask';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from './ConfirmSmsCodeModal.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { LOGIN } from '../../../gql/mutation/auth/Login';
import { PROFILE } from '../../../gql/query/user/Profile';
import { checkUserByPhone } from '../../../gql/mutation/auth/CheckUserByPhone';
import Input from '../../UI/areas/Input/Input';
import { REGISTER } from '../../../gql/mutation/auth/Register';
import { VALIDATE_SMS_CODE } from '../../../gql/mutation/auth/ValidateSmsCode';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';


const ConfirmSmsCodeModal = ({ closeModal, btnCancelClick, setIsAuthModal }: any) => {

    const dispatcher = useAppDispatch()

    const phone = useAppSelector(state => state.user.data?.phone);

    const navigate = useNavigate()

    const [sendCode] = useMutation(VALIDATE_SMS_CODE)


    /** Начальные значения */
    const initialValues = {
        phone: phone,
        code: "",
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

    async function handleSubmit() {
        let response;
        response = await sendCode({ variables: { phone: values.phone } })
        if (response.data.getSmsCode) {

        }
    }

    const handleLogin = () => {
        btnCancelClick()
        setIsAuthModal(true)
    }

    const onChangeCode = (event: any) => {
        handleChange({ target: { name: "code", value: event.target.value } })
    }

    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={494}
        >
            <div className={classes.modal}>
                <div className={classes.modal_header}>
                    <h3>Введите SMS код</h3>
                    <span className={classes.modal_header_btn_return}>Вернуться</span>
                </div>
                <form className={classes.modal_form}>
                    <Input
                        label={`Код отправлен на номер +7 900 000-00-00`}
                        name="code"
                        placeholder=''
                        id="code"
                        className={classes.modal_input}
                        mask={"999999"}
                        value={values.code}
                        onChange={(event: any) => onChangeCode(event)}
                        required
                    />
                    <div className={classes.modal_form_link_gray} onClick={btnCancelClick}>Повторно запросить
                        <span
                            className={classes.modal_form_link_sms}
                        > SMS код</span>
                    </div>
                </form>
                <button
                    onClick={handleSubmit}
                    className={classes.modal_form_btn}
                >Готово</button>
            </div>
            <div className={classes.modal_form_link_wrp}>
                <div className={classes.modal_form_link} onClick={handleLogin}>Я уже зарегистрирован</div>
            </div>
        </ModalWithBackground>
    );
};

export default ConfirmSmsCodeModal;

