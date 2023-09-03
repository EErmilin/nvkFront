import classes from './Header.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../assets/css/main.css';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { setModalVisible } from '../../redux/slices/routerSlice';

function Header() {
    const navigate = useNavigate()
    const isAuth = useAppSelector(state => state.auth.logged);
    const dispatcher = useAppDispatch()

    const handleProfile = () => {
        if (isAuth) {
            navigate("/personal-area")
        } else {
            dispatcher(setModalVisible(true))
        }
    }

    return (
        <header>
            <div className="header-container style__flexbox style__flex-jc-sb">
                <div className="left-header style__flexbox style__flex-ai-c">
                    <NavLink to="/" className="logotype">
                        <div className={classes.header_logo}></div>
                    </NavLink>
                    <ul className="header-menu style__flexbox style__flex-ai-c">
                        <li className="active"><a href="/tape">Лента</a></li>
                        <li><a href="">Новости</a></li>
                        <li><a href="">Музыка</a></li>
                        <li className="has-child"><a href="">Фильмы</a>
                            <ul>
                                <li><a href="">Подпункт</a></li>
                                <li><a href="">Подпункт</a></li>
                            </ul>
                        </li>
                        <li><a href="">Афиша</a></li>
                        <li><a href="">Мультики</a></li>
                        <li><a href="">Гороскоп</a></li>
                        <li className="stream"><a href="/live">Прямой эфир</a></li>
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

