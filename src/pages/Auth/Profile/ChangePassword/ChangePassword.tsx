import Input from "../../../../components/UI/areas/Input/Input";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";
import classes from "./ChangePassword.module.scss";
import React from 'react';

function ChangePassword({ }) {

    return (
        <div className={classes.change}>
            <div className={classes.change_wrp}>
                <h2>Сменить пароль</h2>
                <div className={classes.info}>

                    <Input
                        classNameWrp={classes.input}
                        placeholder='Пароль'
                        name="password"
                        id="password"
                        mask={''}
                        type={'password'}></Input>
                    <Input
                        classNameWrp={classes.input}
                        placeholder='Новый пароль'
                        name="password"
                        id="password"
                        mask={''}
                        type={'password'}></Input>
                    <Input
                        classNameWrp={classes.input}
                        placeholder='Повторите пароль'
                        name="password"
                        id="password"
                        mask={''}
                        type={'password'}></Input>
                </div>
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault
                    //onClick={handleSubmit}
                    title={"Сменить пароль"}
                />
            </div>
        </div>
    )
}

export default ChangePassword