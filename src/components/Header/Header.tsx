import classes from './Header.module.scss';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/css/main.scss';
import React, { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setModalVisible } from '../../redux/slices/routerSlice';

function Header() {
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.logged);
    const dispatcher = useAppDispatch()
    const url = useLocation()

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
            { link: "/tape", title: "Лента" },
            { link: "/news", title: "Новости" },
            { link: "/music", title: "Музыка" },
            { link: "/films", title: "Фильмы" },
            { link: "", title: "Афиша" },
            { link: "", title: "Мультики" },
            { link: "", title: "Избранное" },
            { link: "/live", title: "Прямой эфир" },
            { link: "", title: "Гороскоп" },
        ]

        return arrLinks.map((elem, id) => {
            return (
                <li
                    className={elem.link === url.pathname ? "active" : ''}
                    key={id} >
                    <NavLink to={elem.link}>
                        {elem.title}
                    </NavLink>
                </li>
            )

        })
    }, [url])

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
                </div>
                <div className="right-header style__flexbox style__flex-ai-c">
                    <div className="header-search"><span>Поиск</span></div>
                    <div className="header-profile" onClick={handleProfile}><span>Профиль</span></div>
                </div>
            </div>
        </header>

    );
}

export default Header;

