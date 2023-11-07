import moment from "moment";
import ModalWithBackground from "../ModalWithBackground/ModalWithBackground";
import { useFormik } from "formik";
import classes from "./RatingModal.module.scss";
import CustomTextArea from "../../UI/areas/CustomTextArea/CustomTextArea";
import React, { useEffect } from "react"
import { CREATE_VOTE } from "../../../gql/mutation/Votes/CreateVote";
import { getUpdateClient } from "../../../requests/updateHeaders";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { Rate } from "antd";


const RatingModal = ({ closeModal, btnCancelClick, ratingModal }) => {

  const { id } = useParams()
  const userId = useAppSelector(state => state.user.data?.id);

  /** Начальные значения */
  const initialValues = {
    seriesId: id,
    movieId: id,
    animationId: id,
    comment: "",
    vote: 0,
    userId: userId,
    createdAt: moment().format("YYYY-MM-DD"),
    updatedAt: moment().format("YYYY-MM-DD"),
  };


  /** Стейт полей и правила */
  const { values, handleChange, touched } = useFormik({
    initialValues,
    validateOnMount: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });


  const saveHandle = async (event) => {
    event.preventDefault();
    try {
      let client = await getUpdateClient();
      let response = await client.mutate({
        mutation: CREATE_VOTE,
        variables: {
          createUserVoteInput: {
            ...values
          },
        },
      });
      if (response.data) {
        btnCancelClick()
      }
    } catch (e) {
      console.log(e);
    }
  };

  console.log(values)

  /** Очищаем ошибки и изменяем состояние */
  function ClearErrorAndChange(field, value) {
    handleChange({ target: { name: field, value: value } })
  }


  return (
    <ModalWithBackground
      closeModal={closeModal}
      btnCancelClick={btnCancelClick}
      width={750}
      height={553}
    >
      <div className={classes.modal}>

        <div className={classes.modal_header}>Оставить отзыв</div>
        
        <form className={classes.modal_form}>
        <Rate allowHalf defaultValue={2.5} onChange={(e) => ClearErrorAndChange("vote", e)} />
          <CustomTextArea
            name="comment"
            placeholder="Ввести"
            id="comment"
            height={200}
            className={classes.modal_input}
            value={values.comment}
            onChange={(event) => ClearErrorAndChange("comment", event.target.value)}
          />
        </form>
        <button onClick={saveHandle} className={classes.modal_form_btn}>
          Отправить
        </button>
      </div>
    </ModalWithBackground>
  );
};

export default RatingModal;
