/**
 * Следует применять хук если есть конкретный родительский элемент по которому отловим клик
 * например темный фон под модалкой
 */

import { useState } from 'react';
import { boolean } from 'yup';
import classes from "../components/modals/ModalWithBackground/ModalWithBackground.module.scss";

interface Props {
    initialState?: boolean,
    selector: any
}

/**
 * Управление видимостью элемента и скрытие элемента при клике по какому либо родительскому элементу
 */
export default function useToggleVisibility(
    initialState = false,
    selector = '[data-wrap="modal"]',

): any {
    /** Видимость элемента */
    const [show, toggleVisibility] = useState(initialState);



    /** Если клик внутри, то не закрываем */
    const close = (event: any) => {
        if (event.target.classList.contains(classes.closeBtn)) {
            return toggleVisibility(false);
        }
        if (!(event.type == 'keypress')) {
            const ctx = event.target.closest(selector);
            if (!ctx) {

                toggleVisibility(false);
            }
        }
    };

    return [show, toggleVisibility, close];
}

