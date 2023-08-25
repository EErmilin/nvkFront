import Input from "../../../../components/UI/areas/Input/Input";
import classes from "./ChangePassword.module.scss";


function ChangePassword({ }) {

    return (
        <div className={classes.wrp}>
            <h3 className={classes.title}>Сменить пароль</h3>
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
            <button
                //onClick={handleSubmit}
                className={classes.btn}
            >Сохранить изменения</button>
        </div>
    )
}

export default ChangePassword