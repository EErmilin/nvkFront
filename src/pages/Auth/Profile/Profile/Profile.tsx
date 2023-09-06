
import React from 'react';
import { useFormik } from "formik";
import { useMemo } from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import Input from "../../../../components/UI/areas/Input/Input";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import classes from "./Profile.module.scss";
import { object, string } from "yup";
import moment from "moment";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";
import { updateUser } from '../../../../redux/thunks/user/UpdateUser';

const fakeAvatar = require("../../../../assets/img/3c6646022a18ad8353e3d52fdda6c2da.png")

function Profile({ }) {
    const userData = useAppSelector(state => state.user.data);

    const dispatcher = useAppDispatch()


    const initialValues = {
        phone: userData?.phone ?? "",
        firstname: userData?.firstname ?? "",
        lastname: userData?.lastname ?? "",
        birthdate: moment(userData?.birthdate).format("DD.MM.YYYY") ?? "",
        email: userData?.email ?? "",
    };

    /** Схема валидации */
    const validationSchema = useMemo(
        () =>
            object().shape({

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
        try {
            const response: any = await dispatcher(
                updateUser({
                    firstname: values.firstname,
                    lastname: values.lastname,
                    email: values.email ?? undefined,
                    birthdate: new Date(values.birthdate) ?? undefined,
                    avatar_id: undefined,
                }),
            );
        } catch (error) {
            console.log('error')
            console.log(error)
        }

    }

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field: any, value: any) {
        handleChange({ target: { name: field, value: value } })
    }


    return (
        <div className={classes.profile}>
            <div>
                <div className={classes.user}>
                    <Avatar
                        width={100}
                        height={100}
                        avatar={userData?.avatar}
                        className={classes.avatar}
                    ></Avatar>
                    <div>
                        <div className={classes.user_name}>{userData?.firstname} {userData?.lastname}</div>
                        <div className={classes.user_link}>Изменить фото профиля</div>
                    </div>

                </div>
                <div className={classes.info}>
                    <Input
                        value={values.firstname}
                        labelInput={"Имя"}
                        name="firstname"
                        id="firstname"
                        className={classes.modal_input}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("firstname", e.target.value)
                        }}>
                    </Input>
                    <Input value={values.lastname}
                        labelInput={"Фамилия"}
                        name="lastname"
                        id="lastname"
                        className={classes.modal_input}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("lastname", e.target.value)
                        }}
                    > </Input>
                    <Input value={values.birthdate}
                        labelInput={"День рождения"}
                        name="birthdate"
                        id="birthdate"
                        className={classes.modal_input}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("birthdate", e.target.value)
                        }}> </Input>
                    <Input
                        value={values.phone}
                        mask={"+7 999 999 99-99"}
                        labelInput={"Номер телефона"}
                        name="phone"
                        placeholder='+7'
                        id="phone"
                        className={classes.modal_input}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("phone", e.target.value)
                        }}></Input>
                    <Input value={values.email} labelInput={"Эл.Почта"}
                        name="email"
                        id="email"
                        className={classes.modal_input}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("email", e.target.value)
                        }}></Input>
                </div>
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault
                    onClick={handleSubmit}
                    title={"Сохранить изменения"}
                />
            </div>
        </div>
    )
}

export default Profile