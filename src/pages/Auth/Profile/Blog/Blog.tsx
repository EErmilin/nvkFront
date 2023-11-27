import { useFormik } from 'formik';
import React, { useMemo } from 'react';
import { object } from 'yup';
import CustomTextArea from '../../../../components/UI/areas/CustomTextArea/CustomTextArea';
import Input from '../../../../components/UI/areas/Input/Input';
import ButtonDefault from '../../../../components/UI/btns/Button/Button';
import classes from "./Blog.module.scss";

function Blog({ }) {


    const initialValues = {
        nik: "",
        site: "",
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
        <div className={classes.blog}>
            <h2>Заявка на блогерство</h2>
            <div className={classes.blog_about}>
                <Input value={values.nik} labelInput={"Никнейм (только латинские буквы)"}></Input>
                <CustomTextArea label={"Расскажите о себе"} />
            </div>
            <div className={classes.blog_site}>
                <h3>Сайт(ы)</h3>
                <div className={classes.blog_site_wrp}>
                    <Input value={values.site} labelInput={"Сайт"}></Input>
                    <span className={classes.blog_site_add}>+ Добавить ещё</span>
                </div>
            </div>
            <div className={classes.blog_sites}>
                <h3>Соц.Сети</h3>
                <div className={classes.blog_sites_wrp}>
                    <div className={classes.blog_sites_item}><Input value={values.nik} labelInput={"Ссылка"}></Input> <div className={classes.blog_sites_icon} /></div>
                    <div className={classes.blog_sites_item}><Input value={values.nik} labelInput={"Ссылка"}></Input> <div className={classes.blog_sites_icon} /></div>
                    <div className={classes.blog_sites_item}><Input value={values.nik} labelInput={"Ссылка"}></Input> <div className={classes.blog_sites_icon} /></div>
                    <div className={classes.blog_sites_item}><Input value={values.nik} labelInput={"Ссылка"}></Input> <div className={classes.blog_sites_icon} /></div>
                </div>
            </div>

            <ButtonDefault title='Отправить заявку' className={classes.btn}/>
        </div>
    )
}

export default Blog