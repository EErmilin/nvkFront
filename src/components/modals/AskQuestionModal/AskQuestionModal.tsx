import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import ModalWithBackground from "../ModalWithBackground/ModalWithBackground";
import { useFormik } from "formik";
import { object, string } from "yup";
import classes from "./AskQuestionModal.module.scss";
import Input from "../../UI/areas/Input/Input";
import CustomTextArea from "../../UI/areas/CustomTextArea/CustomTextArea";
import { useAppSelector } from "../../../redux/hooks";
import { getUpdateClient } from "../../../requests/updateHeaders";
import { ApolloError } from "@apollo/client";
import { CREATE_SUPPORT } from "../../../gql/mutation/CreateSupport";
import React from 'react';
import { notification, Spin } from "antd";
import { NotificationType } from "../../../api/types";

const emailFormat = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const AskQuestionModal = ({ closeModal, btnCancelClick, name }: any) => {

  const [nameError, setNameError] = useState('')
  const [textError, setTextError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [loading, setLoading] = useState(false)

  const userId = useAppSelector(state => state.user.data?.id);
  /** Начальные значения */
  const initialValues = {
    text: "",
    email: '',
    name: ''
  };
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    if (type === 'error') {
        return api[type]({
            message: 'Ошибка, проверьте правильность введённых данных',
        });
    }
    api[type]({
        message: 'Вопрос оставлен',
    });
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
  const { values, handleChange, touched } = useFormik({
    initialValues,
    validateOnMount: true,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  async function handleSubmit() {
    if (values.name !== '' && emailFormat.test(values.email) && values.text.length > 0) {
      try {
        setLoading(true);
        let client = await getUpdateClient();
        let response = await client.mutate({
          mutation: CREATE_SUPPORT,
          variables: {
            createSupportInput: {
              name: values.name,
              email: values.email.trim(),
              message: `Вопрос к прямому эфиру ${name}. \n${values.text.trim()}`,
              authorId: userId,
            },
          },
        });
        if (response.data.createSupport) {
          openNotificationWithIcon('success')
          btnCancelClick()
        }
      } catch (e: unknown) {
        if (e instanceof ApolloError) {
          openNotificationWithIcon('error')
        }
      } finally {
        setLoading(false);
      }
    } else {
      if (values.name === '') {
        setNameError('Введите имя');
      }
      if (!emailFormat.test(values.email)) {
        setEmailError('Введите email');
      }
      if (!values.text) {
        setTextError('Заполните вопрос')
      }
    }
  }

  const onChangeText = (event: any) => {
    setTextError('')
    handleChange({ target: { name: "text", value: event.target.value } });
  };


  const onChangeEmail = (event: any) => {
    setEmailError('')
    handleChange({ target: { name: "email", value: event.target.value } });
  };

  const onChangeName = (event: any) => {
    setNameError('')
    handleChange({ target: { name: "name", value: event.target.value } });
  };


  return (
    <ModalWithBackground
      closeModal={closeModal}
      btnCancelClick={btnCancelClick}
      width={750}
    >
      {contextHolder}
      <div className={classes.modal}>
        <div className={classes.modal_header}>Задать вопрос</div>
        <form className={classes.modal_form}>
          <div className={classes.modal_input_wrp}>
            <Input
              errorMessage={nameError}
              name="name"
              placeholder="Имя"
              id="name"
              height={200}
              className={classes.modal_input}
              value={values.name}
              onChange={(event: any) => onChangeName(event)}
            />
            <Input
              errorMessage={emailError}
              name="email"
              placeholder="Email"
              id="email"
              height={200}
              className={classes.modal_input}
              value={values.email}
              onChange={(event: any) => onChangeEmail(event)}
            />
          </div>
          <CustomTextArea
            errorMessage={textError}
            name="text"
            placeholder="Ввести"
            id="text"
            height={200}
            className={classes.modal_input}
            value={values.text}
            onChange={(event: any) => onChangeText(event)}
          />
        </form>
        <button onClick={handleSubmit} className={classes.modal_form_btn}>
          {loading ? <Spin/>: 'Отправить запрос'}
        </button>
      </div>
    </ModalWithBackground>
  );
};

export default AskQuestionModal;
