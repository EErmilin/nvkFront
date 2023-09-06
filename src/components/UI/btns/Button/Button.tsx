
import classes from "./Button.module.scss";
import { Button } from 'antd';
import React from 'react'


interface ButtonDefaultProps {
    title: string
    disabled?: boolean
    className?: any
    onClick?: any
}


function ButtonDefault ({title, disabled, className, onClick} : ButtonDefaultProps ){
    const cls = [disabled? classes.btn_disabled : classes.btn]
    if (className) cls.push(className)
    return (
            <Button className={cls.join(' ')} disabled={disabled} onClick={onClick}>{title}</Button>
    )
}

export default ButtonDefault