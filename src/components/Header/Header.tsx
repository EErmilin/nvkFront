import classes from './Header.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/main.scss';
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setModalVisible } from '../../redux/slices/routerSlice';
import MobileMenu from "../../components/MobileMenu/MobileMenu";
import ButtonDefault from '../UI/btns/Button/Button';

function Header() {
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.logged);
    const dispatcher = useAppDispatch()
    const url = useLocation()
    const [isChildren, setIsChildren] = useState(!!localStorage.getItem('children'))

    const handleProfile = () => {
        if (isAuth) {
            navigate("/personal-area")
        } else {
            dispatcher(setModalVisible(true))
        }
    }

    /** Масив ссылок */
    const templateLinks = useMemo(() => {
        let arrLinks = [
            //  { link: "/tape", title: "Лента" },
            { link: "/", title: "Главная" },
            //{ link: "/news", title: "Новости" },
            { link: "/services", title: "Услуги" },
            { link: "/audio", title: "Аудио" },
            { link: "/movies", title: "Фильмы" },
            { link: "/serials", title: "Сериалы" },
            // { link: "/broadcasts", title: "Передачи" },
            { link: "/live", title: "Прямой эфир" },
            // { link: "", title: "Курсы валют" },
            { link: "/horoscope", title: "Гороскоп" },
        ]

        return arrLinks.map((elem, id) => {
            return (

                <li
                    className={elem.link === url.pathname ? elem.link === "/live" ? "active stream" : "active" : elem.link === "/live" ? 'stream' : ''}
                    key={id} >

                    <NavLink to={elem.link}>
                        {elem.title}
                    </NavLink>
                </li>
            )

        })
    }, [url])


    useEffect(()=>{
        localStorage.setItem('children', isChildren ? 'true' : '')
    },[isChildren])

    return (
        <header>

            <div className="header-container style__flexbox style__flex-jc-sb">
                <div className="left-header style__flexbox style__flex-ai-c">
                    <NavLink to="/" className="logotype">
                        <div className={classes.header_logo}></div>
                    </NavLink>
                    <ul className="header-menu style__flexbox style__flex-ai-c">
                        {templateLinks}
                    </ul>
                    <MobileMenu />
                </div>

                <div className="right-header style__flexbox style__flex-ai-c">
                    {//<div className="header-search"><span>Поиск</span></div>
                    }
                    <button className={[classes.children, !isChildren? classes.children_active: classes.children_no_active ].join(' ')} onClick={() =>setIsChildren(!isChildren)}>Детский</button>

                    <div className="header-profile" onClick={handleProfile}><span>Профиль</span></div>
                </div>
            </div>

        </header>

    );
}

export default Header;

