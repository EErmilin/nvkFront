import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useToggleVisibility from '../../hooks/useToggleVisibility'
import { useAppSelector } from '../../redux/hooks'
import AuthModal from '../modals/AuthModal/AuthModal'
import ButtonDefault from '../UI/btns/Button/Button'
import classes from './ratingNvk.module.scss'

export default function RatingNvk({item }) {


    const isAuth = useAppSelector(state => state.auth.logged);
    const navigate = useNavigate()

    const [isAuthModal, setIsAuthModal, closeIsAuthModal] = useToggleVisibility(false)


    const templateAuthModal = isAuthModal &&
        <AuthModal
            closeModal={closeIsAuthModal}
            btnCancelClick={setIsAuthModal}
        />



    return (
        <div className={classes.rating}>
            <div className={classes.rating_wrp}>
                <div className={classes.rating_number}>{item.ratingNvk}</div>
                <div>
                    <div className={classes.rating_title}>Рейтинг НВК</div>
                    <div className={classes.rating_gray}>{item.userVote.length} отзыва</div>
                </div>
            </div>
            <ButtonDefault title={"Оценить"} className={classes.rating_btn} onClick={() => !isAuth ? setIsAuthModal(true) : navigate('vote')} />
            {templateAuthModal}
        </div>
    )
}