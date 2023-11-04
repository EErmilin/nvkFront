import React, { useEffect, useMemo, useState } from 'react'
import classes from './MobileMenu.module.scss'
import Button from "../UI/btns/Button/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import { setModalVisible } from '../../redux/slices/routerSlice';

export default function MobileMenu() {

    const [menuOpened, setMenuOpened] = useState(false)
    const url = useLocation()
    const dispatcher = useDispatch()
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.logged);
    const modalVisible = useAppSelector(state => state.router.modalVisible);
    function clickHandler(e) {
        const targetClasses = e.target.className.split(" ");

        if (targetClasses.includes(classes.wrap) || targetClasses.includes(classes.close)) {
            setMenuOpened(false)
        }
    }


    /** Масив ссылок */
    const templateLinks = useMemo(() => {
        let arrLinks =[]
        if(isAuth){
            arrLinks = [
                { link: "/personal-area/profile", title: "Редактировать профиль" },
                { link: "/personal-area/changePassword", title: "Сменить пароль" },
               // { link: "hashtags", title: "Мои хэштеги" },
                { link: "/personal-area/settings", title: "Настройки" },
              //  { link: "payment", title: "Платежные данные" },
                { link: "/personal-area/support", title: "Тех.поддержка" },
                { link: "/personal-area/favorites", title: "Избранное" },
               /* { link: "blog", title: "Стать блогером" } */,
                //  { link: "/tape", title: "Лента" },
                { link: "/", title: "Главная" },
                //{ link: "/news", title: "Новости" },
                { link: "/services", title: "Услуги" },
                { link: "/audio", title: "Аудио" },
                { link: "/movies", title: "Фильмы" },
                { link: "/broadcasts", title: "Передачи" },
                { link: "/live", title: "Прямой эфир" },
                // { link: "", title: "Курсы валют" },
                { link: "/horoscope", title: "Гороскоп" },
            ]
        } else{
            arrLinks = [
                //  { link: "/tape", title: "Лента" },
                { link: "/", title: "Главная" },
                //{ link: "/news", title: "Новости" },
                { link: "/services", title: "Услуги" },
                { link: "/audio", title: "Аудио" },
                { link: "/movies", title: "Фильмы" },
                { link: "/broadcasts", title: "Передачи" },
                { link: "/live", title: "Прямой эфир" },
                // { link: "", title: "Курсы валют" },
                { link: "/horoscope", title: "Гороскоп" },
            ]
        }

        return arrLinks.map((elem, id) => {
            return (

                <NavLink to={elem.link} className={classes.link} onClick={() => setMenuOpened(false)} key={id}>
                    {elem.title}
                </NavLink>
            )

        })
    }, [url, isAuth])


    const handleProfile = () => {

        if (isAuth) {
            navigate("/personal-area")
        } else {
            dispatcher(setModalVisible(true))
        }
        
    }

    useEffect(()=>{
        modalVisible && setMenuOpened(false)
    },[modalVisible])



    return (
        <React.Fragment>
            <div
                className={classes.burger}
                onClick={() => { setMenuOpened(true) }}
            >
            </div>
            {menuOpened &&
                <div
                    className={classes.wrap}
                    onClick={clickHandler}
                >
        
                    <div className={classes.panel}>
                        <div className={classes.close}></div>
                        <div className={classes.container}>
                            <div onClick={handleProfile} className={classes.link}>{isAuth ? "Профиль": "Войти"}</div>
                            {templateLinks}
                        </div>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}