
import ModalWithBackground from '../ModalWithBackground/ModalWithBackground';
import classes from './PostModal.module.scss';
import React, { useMemo, useState } from 'react';
import Slider from '../../UI/areas/CustomSlider/CustomSlider';
import { SwiperSlide } from "swiper/react";
import Avatar from '../../Avatar/Avatar';
import { IPost } from '../../../models/Post';
import { getUpdateClient } from '../../../requests/updateHeaders';
import { POST } from '../../../gql/query/posts/Post';
import { useAppSelector } from '../../../redux/hooks';
import { CREATE_POST_COMMENT } from '../../../gql/mutation/post/CreatePostComment';
import Input from '../../UI/areas/Input/Input';
import moment from 'moment';
import CustomTextArea from '../../UI/areas/CustomTextArea/CustomTextArea';
import { Spin } from 'antd';


const REGULAR_HASTAG = /#[0-9A-Za-zА-Яа-яё]+/g;


const PostModal = ({ closeModal, btnCancelClick, post, authorData }: any) => {

    const [postView, setPostView] = React.useState<IPost | null>(null);
    const [content, setContent] = React.useState('');
    const user = useAppSelector((state) => state.user.data);
    const [loading, setLoading] = useState(false)

    React.useEffect(() => {
        (async () => {
            (async () => {
                setLoading(true)
                const client = await getUpdateClient();
                await client
                    .query({
                        query: POST,
                        variables: { postId: post.id },
                    })
                    .then(res => {
                        let post_contant: string = res.data.post.content;
                        setPostView(res.data.post);
                        setContent(
                            post_contant.replace(REGULAR_HASTAG, function replacer(str) {
                                return '<a id=hashtag href="' + str + '">' + str + '</a>';
                            }),
                        );
                    })
                    .catch(e => {
                        console.log(JSON.stringify(e, null, 2));
                    })
                    .finally(() => {
                        setLoading(false)
                    });
            })();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post.id]);


    const [commentText, setCommentText] = React.useState('');
    const [commentSending, setCommentSending] = React.useState(false);

    const sendComment = React.useCallback(async () => {

        if (!commentText.trim() || !user) {
            return;
        }
        setCommentSending(true);
        try {
            setLoading(true)
            const client = await getUpdateClient();
            await client.mutate({
                mutation: CREATE_POST_COMMENT,
                variables: {
                    createPostCommentInput: {
                        content: commentText,
                        userId: user.id,
                        authorId: user.author?.id,
                        postId: post.id,
                    },
                },
            });

            const { data } = await client.query({
                query: POST,
                variables: { postId: post.id },
            });

            let post_contant: string = data.post.content;
            setPostView(data.post);
            setContent(
                post_contant.replace(REGULAR_HASTAG, function replacer(str) {
                    return '<a id=hashtag href="' + str + '">' + str + '</a>';
                }),
            );

            setCommentText('');
        } finally {
            setLoading(false)
            setCommentSending(false);
        }
    }, [commentText, user, post.id]);

    const tempalteImages = post.images?.map((item, key) => <SwiperSlide key={key}><img className={classes.img} src={item.url} /></SwiperSlide>)

    const templateComments = useMemo(() => {
        console.log('@@@@@@@@@@@@@@@')
        console.log(postView)
        if (postView?.postComments) {
            return postView.postComments.map((item) => {
                return <div className={classes.comments_item}>
                    <div className={classes.comments_item_header}><img className={classes.comments_item_header_img} src={item.user.avatar?.url_128}></img>
                     <div className={classes.comments_item_header_name}>{item.user.firstname}</div></div>
                    <div className={classes.comments_item_content}>{item.content}</div>
                    <div className={classes.comments_item_date}>{moment(item.createdAt).fromNow()}</div>
                </div>
            })
        }
        return <p>Нет комментариев</p>

    }, [postView])


    return (
        <ModalWithBackground
            closeModal={closeModal}
            btnCancelClick={btnCancelClick}
            width={1254}
            className={classes.modal}>
            <div className={classes.modal}>
                <div className={classes.slider}>
                    <Slider className={classes.slider_img} isShowBtns={false}>
                        {tempalteImages}
                    </Slider>
                </div>
                <div className={classes.modal_comments}>
                    <div className={classes.modal_comments_header}>
                        <Avatar
                            width={50}
                            height={50}
                            avatar={authorData.author.user?.avatar?.url}
                            className={classes.avatar}
                        ></Avatar>
                        <div>{authorData.author.nickname}</div>
                    </div>
                    <div className={classes.comments}>
                        {loading ?<div className={classes.spin}><Spin/></div> : templateComments}

                    </div>
                    <div className={classes.send}>
                        <CustomTextArea
                        classNameInputWrap={classes.send_input}
                        className={classes.send_input}
                            placeholder='Добавьте комментарий...'
                            mask={""}
                            value={commentText}
                            onChange={(e: any) => {
                                return setCommentText(e.target.value)
                            }}
                        />
                        <div className={classes.send_btn} onClick={sendComment}>Опубликовать</div>
                    </div>
                </div>
            </div>
        </ModalWithBackground>
    );
};

export default PostModal;

