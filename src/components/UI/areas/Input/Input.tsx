import React, { useState } from "react";
import classes from "./Input.module.scss";
import ReactInputMask from 'react-input-mask';

/**
 * Кастомный инпут
 * @param className
 * @param shouldValidate
 * @param required
 * @param errors
 * @param onChange
 * @param value
 * @param touched
 * @constructor
 */

function isInvalid(valid: boolean, touched: boolean, shouldValidate: boolean) {
    return !valid && shouldValidate && touched;
}


function Input({
    placeholder,
    name,
    mask,
    type,
    value,
    className,
    classNameWrp,
    onChange,
    label,
    labelInput,
}: any) {
    /** Состояние для показа пороля */
    const [passwordShow, setPasswordShow] = useState(true)
    /** Устанавливаем тип поля */
    const inputType = type || 'text';

    /** Формируем css классы */
    const  clsInputWrap= [classes.Input];
    if(labelInput){
        clsInputWrap.push(classes.Input_withLabel);
    }
    if (classNameWrp) {
        clsInputWrap.push(classNameWrp);
    }
    
    const cls = [classes.InputWrap];
    if (className) {
        cls.push(className);
    }

    /** Создаем уникальный id */
    const id = `${inputType}-${Math.random()}`;

    /** Отображение label */
    const labelTemplate = label ?

            <div className={classes.label}>{label}</div>
: null;

    const eyeButton = inputType === "password" && <span className={classes.password} onClick={() => setPasswordShow(!passwordShow)}></span>
    const typePassword = inputType === "password" ? (passwordShow ? 'password' : "text") : inputType

    const input = <ReactInputMask
        placeholder={placeholder}
        name={name}
        id={id}
        mask={mask}
        type={typePassword}
        value={value}
        className={cls.join(" ")}
        onChange={onChange}
        required
    />

    return (
        <>
           {labelTemplate}
            <div className={clsInputWrap.join(' ')}>
            {labelInput && <div className={classes.Input_label}>{labelInput}</div>}
                {input}
                {eyeButton}
            </div>
        </>
    );
}

export default Input