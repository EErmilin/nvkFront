

import CustomTextArea from "../../../../components/UI/areas/CustomTextArea/CustomTextArea";
import Input from "../../../../components/UI/areas/Input/Input";
import classes from "./Support.module.scss";
import { CREATE_SUPPORT } from '../../../../gql/mutation/CreateSupport';
import React, { useMemo, useState } from 'react';
import ButtonDefault from "../../../../components/UI/btns/Button/Button";
import { getUpdateClient } from "../../../../requests/updateHeaders";
import { useAppSelector } from "../../../../redux/hooks";
import { object } from "yup";
import { useFormik } from "formik";
import { ApolloError } from "@apollo/client";

function Support({ }) {

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: "",

    })

    const userData = useAppSelector(state => state.user.data);


    const initialValues = {
        name: userData?.firstname ?? "",
        email: userData?.email ?? "",
        message: "",
        authorId: userData?.id,
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
        if (!values.name || !values.email || !values.message) {
            if (!values.name) {
                setErrors({ ...errors, name: "Заполните все поля" })
            }
            if (!values.email) {
                setErrors({ ...errors, email: "Заполните все поля" })
            }
            if (!values.message) {
                setErrors({ ...errors, message: "Заполните все поля" })
            } else {
                try {
                    let client = await getUpdateClient();
                    let response = await client.mutate({
                        mutation: CREATE_SUPPORT,
                        variables: {
                            createSupportInput: {
                                name: values.name,
                                email: values.email.trim(),
                                message: values.message,
                                authorId: values.authorId,
                            },
                        },
                    });
                } catch (e) {
                    if (e instanceof ApolloError) {
                        console.log('e', e.message);
                    }
                }
            }
        }

    }

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field: any, value: any) {
        const errorObj = errors
        errorObj[field as keyof typeof errorObj] = ""
        setErrors(errorObj)
        handleChange({ target: { name: field, value: value } })
    }


    console.log('!!!!!!!!!!!')
    console.log(values)
    console.log(errors)


    return (
        <div className={classes.support}>
            <div className={classes.support_wrp}>
                <h2 className={classes.title}>Тех.Поддержка</h2>
                <div className={classes.info_wrp}>
                    <div className={classes.info}>
                        <Input labelInput={"Имя, Фамилия"}
                            name="name"
                            id="name"
                            value={values.name}
                            errorMessage={errors.name}
                            onChange={(e: any) => {
                                return ClearErrorAndChange("name", e.target.value)
                            }}
                        ></Input>
                        <Input labelInput={"Эл. Почта"}
                            name="email"
                            id="email"
                            value={values.email}
                            errorMessage={errors.email}
                            onChange={(e: any) => {
                                return ClearErrorAndChange("email", e.target.value)
                            }}
                        ></Input>
                    </div>
                    <CustomTextArea label={"Ваш вопрос"}
                        name="message"
                        id="message"
                        value={values.message}
                        errorMessage={errors.message}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("message", e.target.value)
                        }}
                    ></CustomTextArea>
                </div>
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault
                    onClick={handleSubmit}
                    title={"Отправить"}
                />
            </div>
        </div>
    )
}

export default Support