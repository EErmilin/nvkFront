import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { object } from 'yup';
import CustomTextArea from '../../../../components/UI/areas/CustomTextArea/CustomTextArea';
import Input from '../../../../components/UI/areas/Input/Input';
import ButtonDefault from '../../../../components/UI/btns/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import classes from "./Blog.module.scss";
import { authorCreate, authorUpdate } from '../../../../redux/thunks/author/GetAuthor';
import { NotificationType } from '../../../../api/types';
import { notification } from 'antd';
import VkSvg from '../../../../assets/img/vk.svg'; //TODO: сделать фабрику изображений
import TelegramSvg from '../../../../assets/img/telegram.svg';
import YoutubeSvg from '../../../../assets/img/youtube.svg';
import OdnoklassnikiSvg from '../../../../assets/img/odnoklassniki.svg';

function isObjectEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] !== '') {
                return false;
            }
        }
    }
    return true;
}

function Blog({ }) {
    const [api, contextHolder] = notification.useNotification();
    const user = useAppSelector(state => state.user.data);
    const initialValues = {
        nickname: user.nik,
        description: user.about,
        odnoklassniki: user.odnoklassniki,
        telegram: user.telegram,
        vk: user.vk,
        youtube: user.youTube,
        websites: user.sites,
        userId: user?.id,
    };

    const [errors, setErrors]: any = useState({})

    const dispatcher = useAppDispatch()

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Вы уже подали заявку, чтобы стать блогером. Ожидайте подтверждения',
        });
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

    const handleSubmitForm = async (data: any) => {
        if (user?.author) {
            return openNotificationWithIcon("info")
        }
        const errorObj = errors
        if (!values.nickname) {
            errorObj.nickname = "Введите ник"
        }
        if (!values.description) {
            errorObj.description = "Введите Описание"
        }
        if (!isObjectEmpty(errorObj)) {
            return setErrors({ ...errorObj })
        }


        //  if (type === 'Edit' && !!currentAuthor) {
        //    const res = await dispatch(
        //      authorUpdate({
        //        id: currentAuthor.id,
        //        description: data.about,
        //        odnoklassniki: data.odnoklassniki,
        //        telegram: data.telegram,
        //        vk: data.vk,
        //        youtube: data.youTube,
        //        websites: data.sites,
        //        userId: user?.id,
        //      }),
        //    );
        //    console.log(JSON.stringify(res, null, 4));
        //  } else {
        const res = await dispatcher(
            authorCreate({
                nickname: values.nickname,
                description: values.description,
                odnoklassniki: values.odnoklassniki,
                telegram: values.telegram,
                vk: values.vk,
                youtube: values.youtube,
                websites: values.websites,
                userId: values.userId,
            }),
        );
        console.log(JSON.stringify(res, null, 4));
    }
    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field: any, value: any) {
        const errorObj = errors
        errorObj[field as keyof typeof errorObj] = ""
        setErrors(errorObj)
        handleChange({ target: { name: field, value: value } })
    }

    return (
        <div className={classes.blog}>
            {contextHolder}
            <h2>Заявка на блогерство</h2>
            <div className={classes.blog_about}>
                <Input
                    value={values.nickname}
                    labelInput={"Никнейм (только латинские буквы)"}
                    errorMessage={errors.nickname}
                    onChange={(e: any) => {
                        return ClearErrorAndChange("nickname", e.target.value)
                    }}></Input>
                <CustomTextArea
                    label={"Расскажите о себе"}
                    value={values.description}
                    onChange={(e: any) => {
                        return ClearErrorAndChange("description", e.target.value)
                    }}
                    errorMessage={errors.description} />
            </div>
            <div className={classes.blog_site}>
                <h3>Сайт(ы)</h3>
                <div className={classes.blog_site_wrp}>
                    <Input value={values.websites} labelInput={"Сайт"}></Input>
                    {//       <span className={classes.blog_site_add}>+ Добавить ещё</span>
                    }
                </div>
            </div>
            <div className={classes.blog_sites}>
                <h3>Соц.Сети</h3>
                <div className={classes.blog_sites_wrp}>
                    <div className={classes.blog_sites_item}>
                        <Input value={values.vk}
                            onChange={(e: any) => {
                                return ClearErrorAndChange("vk", e.target.value)
                            }}
                            labelInput={"Ссылка"}>
                        </Input> <div className={classes.blog_sites_icon} ><img src={VkSvg} /></div></div>
                    <div className={classes.blog_sites_item}>
                        <Input value={values.telegram}
                            onChange={(e: any) => {
                                return ClearErrorAndChange("telegram", e.target.value)
                            }}
                            labelInput={"Ссылка"}>
                        </Input> <div className={classes.blog_sites_icon} ><img src={TelegramSvg} /></div></div>
                    <div className={classes.blog_sites_item}>
                        <Input value={values.youtube} onChange={(e: any) => {
                            return ClearErrorAndChange("youtube", e.target.value)
                        }}
                            labelInput={"Ссылка"}>

                        </Input> <div className={classes.blog_sites_icon} ><img src={YoutubeSvg} /></div></div>
                    <div className={classes.blog_sites_item}>
                        <Input value={values.odnoklassniki}
                            onChange={(e: any) => {
                                return ClearErrorAndChange("odnoklassniki", e.target.value)
                            }}
                            labelInput={"Ссылка"}>
                        </Input> <div className={classes.blog_sites_icon} ><img src={OdnoklassnikiSvg} /></div></div>
                </div>
            </div>

            <ButtonDefault title='Отправить заявку' className={classes.btn} onClick={handleSubmitForm} />
        </div>
    )
}

export default Blog