
import React from 'react';
import { useFormik } from "formik";
import { useMemo } from "react";
import Avatar from "../../../../components/Avatar/Avatar";
import Input from "../../../../components/UI/areas/Input/Input";
import { useAppSelector } from "../../../../redux/hooks";
import classes from "./Profile.module.scss";
import { object, string } from "yup";
import moment from "moment";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";

const fakeAvatar = require("../../../../assets/img/3c6646022a18ad8353e3d52fdda6c2da.png")

function Profile({ }) {
    const userData = useAppSelector(state => state.user.data);
    console.log(userData)


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
                    <Input value={values.firstname} labelInput={"Имя"}></Input>
                    <Input value={values.lastname} labelInput={"Фамилия"}> </Input>
                    <Input value={values.birthdate} labelInput={"День рождения"} > </Input>
                    <Input value={values.phone} mask={"+7 999 999 99-99"} labelInput={"Номер телефона"}></Input>
                    <Input value={values.email} labelInput={"Эл.Почта"}></Input>
                </div>
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault
                    //onClick={handleSubmit}
                    title={"Сохранить изменения"}
                />
            </div>
        </div>
    )
}

export default Profile