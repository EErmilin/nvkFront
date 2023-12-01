

import classes from "./BloggerPage.module.scss";
import React, { useEffect, useMemo, useState } from 'react';
import Avatar from "../../components/Avatar/Avatar";
import TransitionContainer from "../../components/TransitionContainer/TransitionContainer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { getAuthor } from "../../redux/thunks/author/GetAuthor";
import { useParams } from "react-router-dom";
import { Spin } from "antd";
import useToggleVisibility from "../../hooks/useToggleVisibility";
import PostModal from "../../components/modals/PostModal/PostModal";
import AddPostModal from "../../components/modals/AddPostModal/AddPostModal";



const PostItem = ({ item, authorData }) => {
  const [postModal, setPostModal, closePostModal] = useToggleVisibility(false);
  const templatePostModal = postModal &&
    <PostModal
      post={item}
      authorData={authorData}
      closeModal={closePostModal}
      btnCancelClick={() => setPostModal(false)}
    />
  return <div className={classes.post_item} onClick={() => setPostModal(true)}>{item.images.length ?
    <img src={item.images[0].url} className={classes.post_item}></img> : null}
    {templatePostModal}</div>
}


function BloggerPage({ }) {
  const { id } = useParams()
  const dispatcher = useAppDispatch()
  const userId = useAppSelector(state => state.user.data?.id);
  const authorData = useAppSelector(state => state.screens.authorData);
  const [postModal, setPostModal, closePostModal] = useToggleVisibility(false);

  useEffect(() => {
    dispatcher(getAuthor({ id: Number(id), userId: userId })).then(e => { // переписать на useQwery
      console.log(e);
    });
  }, []);

  if (!authorData) return <Spin size="large" />


  const renderPosts = authorData.author.posts.map((post) => <PostItem item={post} authorData={authorData} />)

  const blocks = [
    {
      title: <div className={classes.posts}>Посты</div>,
      block: <div className={classes.post_wrp}>{renderPosts}</div>
    },
    //  {
    //    title: "Видеоролики",
    //    block: <div></div>
    //  },
    //  {
    //    title: "Аудиофайл",
    //    block: <div></div>
    //  },
  ]


  const templatePostModal = postModal &&
    <AddPostModal
      closeModal={closePostModal}
      btnCancelClick={() => setPostModal(false)}
    />

  return (
    <div className={classes.wrp}>
      {templatePostModal}
      <div className={classes.header}>
        <Avatar
          width={150}
          height={150}
          avatar={authorData?.author?.user?.avatar?.url}
          className={classes.avatar}
        ></Avatar>
        <div className={classes.header_top_wrp}>
          <div className={classes.header_top}>
            <h1>{authorData.author.nickname}</h1>
            <div><div onClick={()=>setPostModal(true)}>Добавить пост</div></div>
          </div>
          <div className={classes.counter_wrp}>
            <span className={classes.counter}><span className={classes.counter_value}>{authorData.authorAggregate.postsCount}</span>Публикации</span>
            <span className={classes.counter}><span className={classes.counter_value}>{authorData.authorAggregate.followsCount}</span>Подписчиков</span>
            <span className={classes.counter}><span className={classes.counter_value}>{authorData.authorAggregate.subsCount}</span>Подписки</span>
          </div>
          <div className={classes.header_description}>{authorData.author.description}</div>
        </div>
      </div>
      <div>
        <TransitionContainer
          isTopLine={true}
          withTitleBorder={false}
          classNameTitle={classes.blocks_titles}
          classNameTitlesWrap={classes.blocks_wrp}
          blocks={blocks}>
        </TransitionContainer>
      </div>
    </div>
  )
}

export default BloggerPage