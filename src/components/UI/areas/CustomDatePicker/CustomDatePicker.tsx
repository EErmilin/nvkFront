import { useRef } from "react"
import classes from "./CustomDatePicker.module.scss"
import "./CustomDatePicker.scss"
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru, enGB } from 'date-fns/esm/locale';
import React from 'react';

registerLocale('ru-RU', ru);

const CustomDatePicker = ({
    className,
    id,
    value,
    onChange,
}: any) => {

    /** Формируем cтили обертки */
    const cls = [classes.CustomDatePicker];
    if (className) {
        cls.push(className);
    }

    const pickerRef = useRef(null)


    const calendar = <DatePicker
        locale={"ru-RU"}
        dateFormat={['dd.MM.yyyy', 'dd/MM/yyyy', 'ddMMyyyy', 'dd MM yyyy']}
        id={id}
        selected={new Date(value)}
        ref={pickerRef}
        onChange={onChange}
    />


    return (
        <div className={cls.join(' ')}>
            {calendar}
        </div>
    );
};



export default CustomDatePicker