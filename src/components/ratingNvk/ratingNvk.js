import React from 'react'
import { useParams } from 'react-router-dom'
import useToggleVisibility from '../../hooks/useToggleVisibility'
import { useAppSelector } from '../../redux/hooks'
import AuthModal from '../modals/AuthModal/AuthModal'
import RatingModal from '../modals/RatingModal/RatingModal'
import ButtonDefault from '../UI/btns/Button/Button'
import classes from './ratingNvk.module.scss'

export default function RatingNvk({item }) {


    console.log('!!!!!!!!!!')
    console.log(item)



    /** Модалка регистрации */
    const [ratingModal, setRatingModal, closeRatingModal] = useToggleVisibility(false)

    const isAuth = useAppSelector(state => state.auth.logged);

    const [isAuthModal, setIsAuthModal, closeIsAuthModal] = useToggleVisibility(ratingModal)



    const templateAuthModal = isAuthModal &&
        <AuthModal
            closeModal={closeIsAuthModal}
            btnCancelClick={setIsAuthModal}
        />


    const templateRatingModal = ratingModal &&
        <RatingModal
            ratingModal={ratingModal}
            closeModal={closeRatingModal}
            btnCancelClick={setRatingModal}
        />

    return (
        <div className={classes.rating}>
            <div className={classes.rating_wrp}>
                <div className={classes.rating_number}>9.3</div>
                <div>
                    <div className={classes.rating_title}>Рейтинг НВК</div>
                    <div className={classes.rating_gray}>134 отзыва</div>
                </div>
            </div>
            <ButtonDefault title={"Оценить"} className={classes.rating_btn} onClick={() => isAuth ? setRatingModal(true) : setIsAuthModal(true)} />
            {templateRatingModal}
            {templateAuthModal}
        </div>
    )
}