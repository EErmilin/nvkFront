import { useEffect, useMemo, useState } from 'react';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from './ConfirmSmsCodeModal.module.scss';
import { useMutation } from '@apollo/client';
import Input from '../../UI/areas/Input/Input';
import { VALIDATE_SMS_CODE } from '../../../gql/mutation/auth/ValidateSmsCode';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import React from 'react';
import { setCode } from '../../../redux/slices/userSlice';


const ConfirmSmsCodeModal = ({ closeModal, btnCancelClick, setIsAuthModal, setIsUserRegisterModal, setIsRegisterModal }: any) => {

    const phone = useAppSelector(state => state.user.data?.phone);
    const dispatcher = useAppDispatch()
    const [error, setErrors] = useState(false)
    const [sendCode, codeData] = useMutation(VALIDATE_SMS_CODE)

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
        response = await sendCode({ variables: { phone: values.phone, code: values.code } })
        await dispatcher(setCode(values.code))
        if (response.data) {
            btnCancelClick()
            setIsUserRegisterModal(true)
        }
    }

    const handleLogin = () => {
        btnCancelClick()
        setIsAuthModal(true)
    }

    const handleBack = () => {
        btnCancelClick()
        setIsRegisterModal(true)
    }

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field: any, value: any) {
        setErrors(false)
        handleChange({ target: { name: field, value: value } })
    }

    useEffect(() => {
        if (codeData.error) setErrors(true)
    }, [codeData.error])


    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={494}
        >
            <div className={classes.modal}>
                <div className={classes.modal_header}>
                    <h2>Введите SMS код</h2>
                    <span className={classes.modal_header_btn_return} onClick={handleBack}>Вернуться</span>
                </div>
                <form className={classes.modal_form}>
                    <div className={classes.modal_form_text}>Код отправлен на номер<span className={classes.modal_form_text_gray}> {phone}</span></div>
                    <Input
                        name="code"
                        placeholder=''
                        id="code"
                        className={classes.modal_input}
                        mask={"9999"}
                        value={values.code}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("code", e.target.value)
                        }}
                        required
                    />
                    <div className={classes.modal_form_link_gray} onClick={btnCancelClick}>Повторно запросить
                        <span
                            className={classes.modal_form_link_sms}
                        > SMS код</span>
                    </div>
                    {error && <span className={classes.error}>{codeData.error?.message}</span>}
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

