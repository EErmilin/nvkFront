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

function isInvalid( errorMessage: string) {
    return errorMessage
}


function Input({
    placeholder,
    name,
    mask,
    type,
    value,
    className,
    multiple,
    classNameWrp,
    onChange,
    label,
    labelInput,
    errorMessage,
    touched,
    required,
}: any) {

    /** Состояние для показа пороля */
    const [passwordShow, setPasswordShow] = useState(true)
    /** Устанавливаем тип поля */
    const inputType = type || 'text';


    /** Формируем css классы */
    const cls = [classes.Input];
    const clsInputWrap = [classes.InputWrap];
    if (className) {
        if(labelInput){
            cls.push(classes.Input_label_wrp);
        }
        cls.push(className);
    }

    /** Создаем уникальный id */
    const id = `${inputType}-${Math.random()}`;

    /** Отображение label */
    const labelTemplate = label ?

        <div className={classes.label}>{label}</div>
        : null;


    /**
* Если поле инвалидно
* то добавляем классы для инвалидного поля,
* иначе, если поле было тронуто добавляем классы для валидного
*/

    if (isInvalid(errorMessage)) {
        cls.push(classes.invalid);
    } else {
        cls.push(classes.valid);
    }

    const errMsg = isInvalid(errorMessage) ? (
        <span>{errorMessage}</span>
    ) : null;

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
        required={required}
        multiple={multiple}        
    />

    return (
        <div className={cls.join(' ')}>
            {labelTemplate}
            <div className={clsInputWrap.join(' ')}>
            {labelInput && <div className={classes.Input_label}>{labelInput}</div>}
                            {input}
                {eyeButton}
            </div>
            {errMsg}
        </div>
    );
}

export default Input