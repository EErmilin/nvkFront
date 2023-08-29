
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import classes from './UserRegisterModal.module.scss';
import Input from '../../UI/areas/Input/Input';
import CustomDatePicker from '../../UI/areas/CustomDatePicker/CustomDatePicker';
import moment from 'moment';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createUser } from '../../../redux/thunks/user/CreateUser';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_LENGTH } from '../../../api/config';



const UserRegisterModal = ({ closeModal, btnCancelClick }: any) => {

    const code = useAppSelector(state => state.user.code);
    const phone = useAppSelector(state => state.user.data?.phone);
    const navigate = useNavigate()
    const dispather = useAppDispatch()


    /** Начальные значения */
    const initialValues = {
        code: code,
        phone: phone,
        name: "",
        password: "",
        confirmPassword: "",
        firstname: "",
        birthdate: moment(new Date(), "YYYY.MM.DD"),
    };

    /** Стейт полей и правила */
    const {
        values,
        handleChange,
        touched,
    } = useFormik({
        initialValues,
        validateOnMount: true,
        onSubmit: (values) => {
            console.log(values)
        },
    });

    async function handleSubmit() {
        if (values.name !== '' &&
            values.password === values.confirmPassword &&
            values.password.length >= PASSWORD_LENGTH) {
            const response: any = await dispather(
                createUser({
                    phone: values.phone,
                    password: values.password,
                    firstname: values.firstname,
                    code: values.code!,
                    birthdate:
                        values.birthdate?.format("YYYY-MM-DD")
                }),
            );
            if (response?.data) {
                btnCancelClick()
                navigate("/personal-area")
            }
        } else {
            console.log("Ошибка валидации")
        }
    }

    const onChangeName = (event: any) => {
        handleChange({ target: { name: "firstname", value: event.target.value } })
    }

    const onChangePassword = (event: any) => {
        handleChange({ target: { name: "password", value: event.target.value } })
    }

    const onChangeConfirmPassword = (event: any) => {
        handleChange({ target: { name: "confirmPassword", value: event.target.value } })
    }

    const onChangeDate = (event: any) => {
        handleChange({ target: { name: "birthdate", value: event.target.value } })
    }

    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={494}
            className={classes.modal_wrp}
        >
            <div className={classes.modal}>
                <div className={classes.modal_header}>
                    <h2>Регистрация</h2>
                    <span className={classes.modal_header_btn_return}>Вернуться</span>
                </div>
                <form className={classes.modal_form}>
                    <Input
                        label={`Данные`}
                        name="firstname"
                        placeholder='Имя'
                        id="firstname"
                        mask={""}
                        value={values.firstname}
                        onChange={(event: any) => onChangeName(event)}
                    />
                    <CustomDatePicker
                        name={"birthdate"}
                        value={values.birthdate}
                        onChange={(value: any) => {
                            onChangeDate({
                                target: { name: "birthdate", value: (moment(value).format("yyyy-MM-DD")) }
                            })
                        }}
                        mask={[/\d/, /\d/, ".", /\d/, /\d/, ".", /\d/, /\d/, /\d/, /\d/]}
                        blurInputOnSelect
                        label={""} />
                    <Input
                        label={`Пароль`}
                        placeholder='Придумайте пароль'
                        name="password"
                        id="password"
                        mask={''}
                        type={'password'}
                        value={values.password}
                        onChange={(event: any) => onChangePassword(event)}
                    />

                    <Input
                        placeholder='Повторите пароль'
                        name="confirmPassword"
                        id="confirmPassword"
                        mask={''}
                        type={'password'}
                        value={values.confirmPassword}
                        onChange={(event: any) => onChangeConfirmPassword(event)}
                    />
                    <div className={classes.modal_form_link_gray} onClick={btnCancelClick}>Нажимая на кнопку я принимаю условия <span className={classes.modal_form_link_sms}>лицензионного договора</span> и <span className={classes.modal_form_link_sms}>разрешаю обработку персональный данных</span>
                    </div>
                </form>
                <button
                    onClick={handleSubmit}
                    className={classes.modal_form_btn}
                >Зарегистрироваться</button>
            </div>
        </ModalWithBackground>
    );
};

export default UserRegisterModal;

