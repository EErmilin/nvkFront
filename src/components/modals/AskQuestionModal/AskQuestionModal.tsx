import { forwardRef, useImperativeHandle, useMemo, useState } from 'react';
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from './AskQuestionModal.module.scss';
import Input from '../../UI/areas/Input/Input';


const AskQuestionModal = ({ closeModal, btnCancelClick }: any) => {



    /** Начальные значения */
    const initialValues = {
        text: "",
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

    }


    const onChangeText = (event: any) => {
        handleChange({ target: { name: "text", value: event.target.value } })
    }

    const handleClickInside = (event: any) => {
        event.stopPropagation(); // Останавливаем всплытие события
        // Дополнительный код, который вы хотите выполнить при клике внутри
    };




    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={750}
            height={453}
        >
            <div className={classes.modal} >
                <div className={classes.modal_header}>
                    <h3>Задать вопрос</h3>
                </div>
                <form className={classes.modal_form}>
                    <Input
                        name="text"
                        placeholder='Ввести'
                        id="text"
                        className={classes.modal_input}
                        value={values.text}
                        onChange={(event: any) => onChangeText(event)}
                        required
                    />
                </form>
                <button
                    onClick={handleSubmit}
                    className={classes.modal_form_btn}
                >Отправить запрос</button>
            </div>
        </ModalWithBackground>
    );
};

export default AskQuestionModal;

