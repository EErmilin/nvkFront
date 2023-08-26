

import CustomTextArea from "../../../../components/UI/areas/CustomTextArea/CustomTextArea";
import Input from "../../../../components/UI/areas/Input/Input";
import classes from "./Support.module.scss";


function Support({ }) {



    return (
        <div className={classes.wrp}>
            <h2 className={classes.title}>Тех.Поддержка</h2>
            <div className={classes.info}>
                <Input></Input>
                <Input></Input>
            </div>
   <CustomTextArea></CustomTextArea>
        </div>
    )
}

export default Support