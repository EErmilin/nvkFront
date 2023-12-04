
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import classes from './UnlockModal.module.scss';
import React, { useState } from 'react';
import Input from '../../UI/areas/Input/Input';
import ButtonDefault from '../../UI/btns/Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';





const UnlockModal = ({ closeModal, btnCancelClick, setIsChildren, historyState }: any) => {

    const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
    const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
    const [operator, setOperator] = useState("*");
    const navigate = useNavigate()
    const [answer, setAnswer] = useState(num1 * num2);
    const [userAnswer, setUserAnswer] = useState("");
    const url = useLocation()
    const generateCaptcha = () => {
        // Reset user answer and error message
        setUserAnswer("");
        const first = Math.floor(Math.random() * 10) + 1
        // Generate new numbers and operator
        setNum1(first)
        const second = Math.floor(Math.random() * 10) + 1
        setNum2(second);
        const operators = ["*"];
        const randomIndex = Math.floor(Math.random() * operators.length);
        setOperator(operators[randomIndex]);

        // Calculate new answer
        switch (operator) {
            case "+":
                setAnswer(num1 + num2);
                break;
            case "-":
                setAnswer(num1 - num2);
                break;
            case "*":
                setAnswer(first * second);
                break;
            case "/":
                setAnswer(num1 / num2);
                break;
            default:
                setAnswer(num1 + num2);
        }
    };


    const handleSubmit = () => {
        console.log(userAnswer)
        console.log(answer)
        if (parseInt(userAnswer) === answer) {
            setIsChildren('')
            btnCancelClick()
            navigate(url.pathname, { replace: true })
        } else {
            // Incorrect answer, display error message and generate new captcha
            generateCaptcha();
        }
    };

    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={750}
            className={classes.modal}>
            <div className={classes.modal}>
                <h2 className={classes.title}>Решите эту задачу</h2>
                <div className={classes.question}>{num1} {operator} {num2} =</div>

                <div className={classes.bottom}>
                    <Input placeholder={'Ответ'} value={userAnswer} className={classes.bottom_input}
                        onChange={(e) => setUserAnswer(e.target.value)}></Input>
                    <ButtonDefault title={'Готово'} onClick={handleSubmit} />
                </div>
            </div>
        </ModalWithBackground>
    );
};

export default UnlockModal;

