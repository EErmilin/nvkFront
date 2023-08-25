
import classes from "./Hashtags.module.scss";
import HashtagBtn from "../../../../components/UI/btns/HashtagBtn/HashtagBtn";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";

function Hashtags({ }) {



    return (
        <div className={classes.wrp}>
            <h3 className={classes.title}>Мои хэштеги<span className={classes.link}>Изменить</span></h3>
            <span>Хэштеги нужны для отфильтровки новостей. По ней будут что-то показывать </span>
            <div className={classes.hashtags}>
                <HashtagBtn hashtag={"Якутс"} />
                <HashtagBtn hashtag={"Томпонский улус"} />
                <HashtagBtn hashtag={"Таттинский улус"} />
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault title={"Сохранить изменения"} disabled={true}/>
            </div>
        </div>
    )
}

export default Hashtags