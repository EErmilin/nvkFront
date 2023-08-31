import React from "react";
import classes from "./CustomTextArea.module.scss";

function isInvalid(valid: any, touched: any, shouldValidate: any,errorMessage: any) {
    return !valid && shouldValidate && touched && errorMessage;
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
        </div>
    )
}

export default CustomTextArea