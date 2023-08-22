import React, { useEffect, useRef, useState } from 'react';
import DarkBackground from '../DarkBackground/DarkBackground';
import classes from './ModalWithBackground.module.scss';

interface ModalProps {
    children: React.ReactNode
    className?: string
    closeModal?: any
    btnCancelClick?: any
    width?: number
    height?: number
}

const ModalWithBackground = ({
    children,
    className,
    closeModal,
    btnCancelClick,
    width,
    height,
}: ModalProps) => {
    const cls = [classes.Modal]
    if (className) cls.push(className)

    const closeBtn = <button className={classes.closeBtn} onClick={(event) => btnCancelClick(event)}><span className={classes.icon}>X</span></button>

    return (
        <DarkBackground
            closeModal={closeModal}>
            <div
                className={cls.join(' ')}
                style={{
                    maxWidth: width || '',
                    maxHeight: height || '',
                }}
                data-wrap="modal"
            >
                <div>
                    {children}
                    {closeBtn}
                </div>
            </div>
        </DarkBackground>
    );
};

export default ModalWithBackground;

