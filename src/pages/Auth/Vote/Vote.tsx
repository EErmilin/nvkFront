

import classes from "./Vote.module.scss";
import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import moment from "moment";
import { useFormik } from "formik";
import { getUpdateClient } from "../../../requests/updateHeaders";
import { CREATE_VOTE } from "../../../gql/mutation/Votes/CreateVote";
import CustomTextArea from "../../../components/UI/areas/CustomTextArea/CustomTextArea";
import { CURRENT_SERIAS } from "../../../gql/query/series/Series";
import ButtonDefault from "../../../components/UI/btns/Button/Button";
import { GET_MOVIE } from "../../../gql/query/films/films";
import { NotificationType } from "../../../api/types";
import { notification } from "antd";



function Vote({ }) {

    const { id } = useParams()
    const navigate = useNavigate()
    const url = useLocation()
    const userId = useAppSelector(state => state.user.data?.id);

    const [errors, setErrors] = useState("")

    const [broadcastData, setBroadcastData] = React.useState<any>(
        {} as any,
    );

    /** Начальные значения */
    const initialValues = {

        comment: "",
        vote: 10,
        userId: userId,
        createdAt: moment().format("YYYY-MM-DD"),
        updatedAt: moment().format("YYYY-MM-DD"),
    };

    const type = url.pathname.includes("movies") ? GET_MOVIE : CURRENT_SERIAS
    const idType = type === GET_MOVIE ? "movieId" : "seriesId"

    React.useEffect(() => {
        if (!idType) return

        (async () => {
            const client = await getUpdateClient();
            await client
                .query({
                    query: type,
                    variables: { [idType]: Number(id) },
                })
                .then(res => {
                    setBroadcastData(type === GET_MOVIE ? res.data.movie : res.data.series);

                })
                .catch(e => {
                    console.log(JSON.stringify(e, null, 2));
                })
        })();

    }, [idType]);

    /** Стейт полей и правила */
    const { values, handleChange, touched } = useFormik({
        initialValues,
        validateOnMount: true,
        onSubmit: (values) => {
            console.log(values);
        },
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        if (type === 'error') {
            return api[type]({
                message: 'Ошибка, проверьте правильность введённых данных',
            });
        }
        api[type]({
            message: 'Комментарий оставлен',
        });
    };


    const saveHandle = async (event) => {
        if (!values.comment) return setErrors("Заполните отзыв")
        event.preventDefault();
        try {
            let client = await getUpdateClient();
            let response = await client.mutate({
                mutation: CREATE_VOTE,
                variables: {
                    createUserVoteInput: {
                        ...values, [idType]: Number(id),
                    },
                },
            });
            if (response.data) {
                return navigate(`/${url.pathname.split("/")[1]}/${id}`)
            }
            openNotificationWithIcon('error')
        } catch (e) {
            openNotificationWithIcon('error')
            console.log(e);
        }
    };

    /** Очищаем ошибки и изменяем состояние */
    function ClearErrorAndChange(field, value) {
        if (field === "comment") {
            setErrors("")
        }
        handleChange({ target: { name: field, value: value } })
    }



    const templateRating = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((number) => {
        return <div className={[classes.rating, values.vote == number ? classes.rating_active : ""].join(" ")} onClick={() => ClearErrorAndChange("vote", number)}>{number}</div>
    })

    if (!broadcastData) return

    return (
        <div className={classes.vote}>
            {contextHolder}
            <div className={classes.img_wrp}>
                <img src={broadcastData.image?.url_512} className={classes.img}></img>
                <ButtonDefault title={"Вернуться"} className={classes.return} onClick={() => navigate(`/${url.pathname.split("/")[1]}/${id}`)} />
            </div>

            <form className={classes.vote_form}>
                <h2 className={classes.title}>{broadcastData.name}</h2>
                <div className={classes.rating_wrp}>{templateRating}</div>
                <CustomTextArea
                    name="comment"
                    placeholder="Отзыв. (минимум 50 символов)"
                    id="comment"
                    height={200}
                    errorMessage={errors}
                    classNameInputWrap={classes.vote_input}
                    value={values.comment}
                    onChange={(event) => ClearErrorAndChange("comment", event.target.value)}
                />
                <ButtonDefault onClick={saveHandle} className={classes.vote_form_btn} title={"Опубликовать"} />
            </form>

        </div>
    )
}

export default Vote