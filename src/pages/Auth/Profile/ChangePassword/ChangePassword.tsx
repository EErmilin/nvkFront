import Input from "../../../../components/UI/areas/Input/Input";
import classes from "./ChangePassword.module.scss";


function ChangePassword ({}){

    return (
        <div className={classes.wrp}>
            <h3 className={classes.title}>Сменить пароль</h3>
                <div className={classes.info}>
                <Input></Input>
                <Input></Input>
                <Input></Input>
                </div>
        </div>
    )
}

export default ChangePassword