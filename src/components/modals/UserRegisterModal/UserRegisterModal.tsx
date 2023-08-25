import { useMemo } from 'react';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from './UserRegisterModal.module.scss';
import { useMutation } from '@apollo/client';
import Input from '../../UI/areas/Input/Input';
import CustomDatePicker from '../../UI/areas/CustomDatePicker/CustomDatePicker';
import moment from 'moment';
import { CREATE_USER } from '../../../gql/mutation/user/CreateUser';
import { REGISTER } from '../../../gql/mutation/auth/Register';



const UserRegisterModal = ({ closeModal, btnCancelClick }: any) => {


    const [register] = useMutation(REGISTER)


    /** Начальные значения */
    const initialValues = {
        name: "",
        password:"",
        confirmPassword: "",
        date: moment(new Date(), "YYYY.MM.DD"),
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
        let response;
       // response = await register({ variables: {signUpInput:{ phone: values.password, code: values.code }} })
    }

    const onChangeName = (event: any) => {
        handleChange({ target: { name: "name", value: event.target.value } })
    }

    const onChangePassword = (event: any) => {
        handleChange({ target: { name: "password", value: event.target.value } })
    }

    const onChangeConfirmPassword = (event: any) => {
        handleChange({ target: { name: "confirmPassword", value: event.target.value } })
    }

    const onChangeDate = (event: any) => {
        handleChange({ target: { name: "date", value: event.target.value } })
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
                    <h3>Регистрация</h3>
                    <span className={classes.modal_header_btn_return}>Вернуться</span>
                </div>
                <form className={classes.modal_form}>
                    <Input
                        label={`Данные`}
                        name="code"
                        placeholder='Имя'
                        id="code"
                        mask={""}
                        value={values.name}
                        onChange={(event: any) => onChangeName(event)}
                    />
                    <CustomDatePicker
                        name={"date"}
                        value={values.date}
                        onChange={(value: any) => {
                            onChangeDate({
                                target: { name: "date", value: (moment(value).format("yyyy-MM-DD")) }
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

