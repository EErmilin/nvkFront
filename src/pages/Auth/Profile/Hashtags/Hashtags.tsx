
import classes from "./Hashtags.module.scss";
import HashtagBtn from "../../../../components/UI/btns/HashtagBtn/HashtagBtn";
import ButtonDefault from "../../../../components/UI/btns/Button/Button";
import React from 'react';

function Hashtags({ }) {



    return (
        <div className={classes.hashtags}>
            <div>
                <h2>Мои хэштеги<span className={classes.link}>Изменить</span></h2>
                <span>Хэштеги нужны для отфильтровки новостей. По ней будут что-то показывать </span>
                <div className={classes.hashtags_wrp}>
                    <HashtagBtn hashtag={"Якутс"} />
                    <HashtagBtn hashtag={"Томпонский улус"} />
                    <HashtagBtn hashtag={"Таттинский улус"} />
                </div>
            </div>
            <div className={classes.btn_wrp}>
                <ButtonDefault title={"Сохранить изменения"} disabled={true} />
            </div>
        </div>
    )
}

export default Hashtags