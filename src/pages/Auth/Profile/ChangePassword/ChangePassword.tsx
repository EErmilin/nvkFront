import Input from "../../../../components/UI/areas/Input/Input";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";
import classes from "./ChangePassword.module.scss";
import React, { useMemo, useState } from 'react';
import { useFormik } from "formik";
import { object } from "yup";
import { CHANGE_PASSWORD } from '../../../../gql/mutation/user/ChangePassword';
import { getUpdateClient } from "../../../../requests/updateHeaders";
import { PASSWORD_LENGTH } from "../../../../api/config";
import { ApolloError } from "@apollo/client";

function ChangePassword({ }) {
    const [errors, setErrors] = useState({
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",

    })


    const initialValues = {
        oldPassword: "",
        newPassword: "",
        repeatPassword: ""
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
        if (
            values.oldPassword.length >= PASSWORD_LENGTH &&
            values.newPassword.length >= PASSWORD_LENGTH &&
            values.newPassword === values.repeatPassword
        ) {
            try {
                let client = await getUpdateClient();
                let response = await client.mutate({
                    mutation: CHANGE_PASSWORD,
                    variables: {
                        changePasswordInput: {
                            currentPassword: values.oldPassword,
                            newPassword: values.newPassword,
                        },
                    },
                });

                console.log('response')
                console.log(response)

            } catch (e) {
                if (e instanceof ApolloError) {
                    if (e.message === 'Invalid current password') {
                        setErrors({ ...errors, oldPassword: `Текущий пароль неверен` })
                    }
                    console.log('e', e.message);
                }
            }
        } else {
            if (values.oldPassword.length < PASSWORD_LENGTH) {
                setErrors({ ...errors, oldPassword: `Текущий пароль должен содержать минимум ${PASSWORD_LENGTH} символов` })
            }
            if (values.newPassword.length < PASSWORD_LENGTH) {
                setErrors({ ...errors, newPassword: `Новый пароль должен содержать не менее ${PASSWORD_LENGTH} символов` })
            }
            if (values.newPassword !== values.repeatPassword) {
                setErrors({ ...errors, repeatPassword: "Пароли не совпадпают" })
            }


        }
    }

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field: string, value: any) {
        const errorObj = errors
        errorObj[field as keyof typeof errorObj] = ""
        setErrors(errorObj)
        handleChange({ target: { name: field, value: value } })
    }

    return (
        <div className={classes.change}>
            <div className={classes.change_wrp}>
                <h2>Сменить пароль</h2>
                <div className={classes.info}>

                    <Input
                        classNameWrp={classes.input}
                        placeholder='Пароль'
                        name="oldPassword"
                        id="oldPassword"
                        mask={''}
                        type={'oldPassword'}
                        errorMessage={errors.oldPassword}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("oldPassword", e.target.value)
                        }}></Input>
                    <Input
                        classNameWrp={classes.input}
                        placeholder='Новый пароль'
                        name="newPassword"
                        id="newPassword"
                        mask={''}
                        type={'newPassword'}
                        errorMessage={errors.newPassword}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("newPassword", e.target.value)
                        }}></Input>
                    <Input
                        classNameWrp={classes.input}
                        placeholder='Повторите пароль'
                        name="repeatPassword"
                        id="repeatPassword"
                        mask={''}
                        type={'repeatPassword'}
                        errorMessage={errors.repeatPassword}
                        onChange={(e: any) => {
                            return ClearErrorAndChange("repeatPassword", e.target.value)
                        }}></Input>
                </div>
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault
                    onClick={handleSubmit}
                    title={"Сменить пароль"}
                />
            </div>
        </div>
    )
}

export default ChangePassword