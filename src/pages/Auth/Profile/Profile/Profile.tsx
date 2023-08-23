
import Avatar from "../../../../components/Avatar/Avatar";
import classes from "./Profile.module.scss";

const fakeAvatar = require("../../../../assets/img/3c6646022a18ad8353e3d52fdda6c2da.png")

function Profile ({}){



    return (
        <div className={classes.wrp}>
            <div className={classes.info}>
                <Avatar
                    width={100}
                    height={100}
                    avatar={fakeAvatar}
                    className={classes.avatar}
                ></Avatar>
                <div>
                    <h3>Катерина Моисеева</h3>
                    <span>Изменить фото профиля</span>
                </div>
                </div>
        </div>
    )
}

export default Profile