

import classes from "./BloggerPage.module.scss";
import React, { useEffect, useMemo } from 'react';
import Avatar from "../../components/Avatar/Avatar";
import TransitionContainer from "../../components/TransitionContainer/TransitionContainer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAuthor } from "../../redux/thunks/author/GetAuthor";
import { useParams } from "react-router-dom";


function BloggerPage({ }) {
  const { id } = useParams()
  const dispatcher = useAppDispatch()
  const userId = useAppSelector(state => state.user.data?.id);
  const blocks = [
    {
      title: "Посты",
      block: <div></div>
    },
    {
      title: "Видеоролики",
      block: <div></div>
    },
    {
      title: "Аудиофайл",
      block: <div></div>
    },
  ]
console.log('@@@@@@@@@@@@@')
console.log(userId)

  useEffect(() => {
    dispatcher(getAuthor({ id: Number(id), userId: userId })).then(e => {
      // setData(e.payload as IAuthor);
      console.log(e);
    });
  }, []);


  return (
    <div className={classes.wrp}>
      <div className={classes.header}>

        <Avatar
          width={150}
          height={150}
          avatar={null}
          className={classes.avatar}
        ></Avatar>
        <div className={classes.info}>
          <h1>Kater_ina</h1>
          <div className={classes.counter_wrp}>
            <span className={classes.counter}><span className={classes.counter_value}>19</span>Публикации</span>
            <span className={classes.counter}><span className={classes.counter_value}>19</span>Подписчиков</span>
            <span className={classes.counter}><span className={classes.counter_value}>19</span>Подписки</span>
          </div>
          <div className={classes.header_description}>Равным образом дальнейшее развитие различных форм деятельности представляет собой интересный эксперимент проверки соответствующий условий активизации. Развернуть</div>
        </div>

      </div>
      <div>
        <TransitionContainer
          withTitleBorder={true}
          classNameTitle={classes.broadcast_seasons_titles}
          classNameTitlesWrap={classes.broadcast_seasons_titles_wrp}
          blocks={blocks}>
        </TransitionContainer>
      </div>
    </div>
  )
}

export default BloggerPage