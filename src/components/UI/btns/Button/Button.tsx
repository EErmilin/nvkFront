
import classes from "./Button.module.scss";
import { Button } from 'antd';


interface ButtonDefaultProps {
    title: string
    disabled?: boolean
}


function ButtonDefault ({title, disabled} : ButtonDefaultProps ){
    const cls = [disabled? classes.btn_disabled : classes.btn]
    return (
            <Button className={cls.join(' ')} disabled={disabled}>{title}</Button>
    )
}

export default ButtonDefault