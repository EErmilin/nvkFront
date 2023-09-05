
import classes from "./Button.module.scss";
import { Button } from 'antd';
import React from 'react'


interface ButtonDefaultProps {
    title: string
    disabled?: boolean
    className?: any
}


function ButtonDefault ({title, disabled, className} : ButtonDefaultProps ){
    const cls = [disabled? classes.btn_disabled : classes.btn]
    if (className) cls.push(className)
    return (
            <Button className={cls.join(' ')} disabled={disabled}>{title}</Button>
    )
}

export default ButtonDefault