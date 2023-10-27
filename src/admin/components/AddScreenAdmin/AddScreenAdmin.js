

import classes from "./AddScreenAdmin.module.scss";
import React, { useMemo } from 'react';
import { Button, DatePicker, Input, Select, Space, Table, Tag } from "antd";
import { useFormik } from "formik";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { useParams } from "react-router-dom";
import './AddScreenAdmin.css'

const props = {
    name: 'file',
    multiple: false,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            // message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            //message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const onChange = (date, dateString) => {
    console.log(date, dateString);
};

function AddScreenAdmin({ }) {

    /** Начальные значения */
    const initialValues = {
        phone: "",
        password: "",
    };


const {type, subtype} = useParams()

    /** Стейт полей и правила */
    const {
        values,
        handleChange,
        touched,
        handleBlur,
        setTouched,
    } = useFormik({
        initialValues,
        validateOnMount: true,
        onSubmit: (values) => {
            console.log(values)
        },
    });
console.log(subtype)
    const renderForm = () => {
        if(subtype==="seasons"){
            return <form className={classes.form}>
                <Input placeholder="Название"></Input>
                <Input placeholder="Номер"></Input>
                <div className={classes.select}>  <Select placeholder="Сериал" ></Select></div>
              
            </form>
        }
        if(subtype==="episodes"){
            return<form className={classes.form}>
            <Input placeholder="Название"></Input>
            <Input placeholder="Url"></Input>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Изображение</p>
                <p className="ant-upload-hint">
                    Перетащите файлы сюда или нажмите для выбора
                </p>
            </Dragger>
            <DatePicker onChange={onChange} placeholder={"Дата"} />
            <TextArea placeholder="Описание"></TextArea>
        </form>
        }
        return <form className={classes.form}>
            <Input placeholder="Название"></Input>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Изображение</p>
                <p className="ant-upload-hint">
                    Перетащите файлы сюда или нажмите для выбора
                </p>
            </Dragger>
            <DatePicker onChange={onChange} placeholder={"Дата"} />
            <TextArea placeholder="Описание"></TextArea>
        </form>
    }

    return (
        <div className={classes.films}>
            {renderForm()}
        </div>
    )
}

export default AddScreenAdmin