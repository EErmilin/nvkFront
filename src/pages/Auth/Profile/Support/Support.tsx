

import CustomTextArea from "../../../../components/UI/areas/CustomTextArea/CustomTextArea";
import Input from "../../../../components/UI/areas/Input/Input";
import classes from "./Support.module.scss";
import React from 'react';
import ButtonDefault from "../../../../components/UI/btns/Button/Button";

function Support({ }) {



    return (
        <div className={classes.support}>
            <div className={classes.support_wrp}>
                <h2 className={classes.title}>Тех.Поддержка</h2>
                <div className={classes.info_wrp}>
                    <div className={classes.info}>
                        <Input labelInput={"Имя, Фамилия"}></Input>
                        <Input labelInput={"Номер телефона"}></Input>
                    </div>
                    <CustomTextArea label={"Ваш вопрос"}></CustomTextArea>
                </div>
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault
                    //onClick={handleSubmit}
                    title={"Отправить"}
                />
            </div>
        </div>
    )
}

export default Support