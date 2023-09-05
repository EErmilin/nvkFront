import { useEffect, useMemo, useState } from 'react';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from './RegisterModal.module.scss';
import { useMutation } from '@apollo/client';
import { GET_SMS_CODE } from '../../../gql/mutation/auth/GetSmsCode';
import { checkUserByPhone } from '../../../gql/mutation/auth/CheckUserByPhone';
import Input from '../../UI/areas/Input/Input';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { setUser } from '../../../redux/slices/userSlice';
import React from 'react';


const RegisterModal = ({ closeModal, btnCancelClick, setIsAuthModal, setIsCodeModal }: any) => {

    const dispatcher = useAppDispatch()
    const phone = useAppSelector(state => state.user.data?.phone);
    const [error, setErrors] = useState(false)
    const [getSmsCode, codeData] = useMutation(GET_SMS_CODE)
    const [checkUser, userData] = useMutation(checkUserByPhone)

    /** Начальные значения */
    const initialValues = {
        phone: phone ?? "",
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
        setTouched
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

            if (!response.data.checkUserByPhone) {
                response = await getSmsCode({ variables: { phone: values.phone } })
                if (response.data.getSmsCode) {
                    dispatcher(setUser({ phone: values.phone }))
                    btnCancelClick()
                    setIsCodeModal(true)
                }
            }
        } catch (error) {
            console.log('error')
            console.log(error)
        }

    }

    const handleLogin = () => {
        btnCancelClick()
        setIsAuthModal(true)
    }

    useEffect(() => {
        if (codeData.error) setErrors(true)
    }, [codeData.error])


    const handleBack = () => {
        btnCancelClick()
        setIsAuthModal(true)
    }


    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field: any, value: any) {
        setErrors(false)
        handleChange({ target: { name: field, value: value } })
    }

    const isPhoneValid = (values.phone.match(/\d/g)?.join('')[1] === '9' && (values.phone.match(/\d/g)?.join('')?.length == 11)) || !values.phone[4]

    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={494}
        >
            <div className={classes.modal}>
                <div className={classes.modal_header}>
                    <h2>Регистрация</h2>
                    <span className={classes.modal_header_btn_return} onClick={handleBack}>Вернуться</span>
                </div>
                <form className={classes.modal_form}>
                    <p>С помощью телефона</p>
                    <Input
                        name="phone"
                        placeholder='+7'
                        id="phone"
                        mask={"+7 (999) 999-99-99"}
                        value={values.phone}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("phone", e.target.value)
                        }}
                    />
                    {error && <span className={classes.error}>{codeData.error?.message}</span>}
                </form>

                <button
                    onClick={handleSubmit}
                    className={classes.modal_form_btn}
                >Получить SMS код</button>
            </div>
            <div className={classes.modal_form_link_wrp}>
                <div className={classes.modal_form_link} onClick={handleLogin}>Я уже зарегистрирован</div>
            </div>
        </ModalWithBackground>
    );
};

export default RegisterModal;

