import React from "react";
import classes from "./CustomTextArea.module.scss";

function isInvalid( errorMessage: string) {
    return errorMessage
}


function CustomTextArea ({
    onChange,
    name,
    className,
    classNameInputWrap,
    value,
    placeholder,
    disabled,
    label,
    errorMessage,
}: any){
    /** Создаем уникальный id */
    const id = `textarea-${Math.random()}`;

    /** Формируем css классы */
    const cls = [classes.TextArea];
    if (className) {
        cls.push(className);
    }
    const clsInputWrap = [classes.TextArea_wrap]
    if(classNameInputWrap)clsInputWrap.push(classNameInputWrap)

    if (isInvalid(errorMessage)) {
        cls.push(classes.invalid);
    } else {
        cls.push(classes.valid);
    }

    const errMsg = isInvalid(errorMessage) ? (
        <span>{errorMessage}</span>
    ) : null;


    return (
        <div className={cls.join(' ')}>
                        <label >{label}</label> 
            <div className={clsInputWrap.join(' ')}>

                <textarea
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                ></textarea>
            </div>
            {errMsg}
        </div>
    )
}

export default CustomTextArea