import React from "react";
import classes from "./DarkBackground.module.scss";

interface ModalProps {
    children: React.ReactNode
    className?: string
    closeModal?: any
}


function DarkBackground ({ children, className, closeModal} : ModalProps){
    /** Формируем классы стилей */
    const cls = [classes.DarkBackground];
    if (className) {
        cls.push(className);
    }


    return (
        <div
            onMouseDown={closeModal}
            onKeyPress={closeModal}
            className={cls.join(' ')}
            role="button"
        >
            {children}
        </div>
    )
}

export default DarkBackground