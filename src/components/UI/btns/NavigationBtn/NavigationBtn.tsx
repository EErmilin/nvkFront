import React from "react";
import classes from "./NavigationBtn.module.scss";
import {ReactComponent as Button} from "../../../../assets/img/NavigationBtn.svg";




/**
 * @param className
 * @param onClick
 * @param type Тип кнопки вперед/назад
 * @returns {JSX.Element}
 * @constructor
 *
 */

function NavigationBtn ({
    className,
    onClick,
    type="next"||"prev",
    ref,
}: any){
    const cls = [classes.navigation_btn]
    if(className)cls.push(className)

    const typeArrow = type=="next"?<Button />:<Button className={classes.left} />

    return (
        <button
            className={cls.join(' ')}
            onClick={onClick}
            ref={ref}
        >
            {typeArrow}
        </button>
    )
}

export default NavigationBtn