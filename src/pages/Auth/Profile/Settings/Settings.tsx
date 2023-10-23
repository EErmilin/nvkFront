import { Switch } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../../hooks/useTheme";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setTheme } from "../../../../redux/slices/userSlice";
import { logout } from "../../../../redux/thunks/auth/Logout";
import classes from "./Settings.module.scss";
import "./Switch.scss"


function Settings({ }) {
    const colorTheme = useAppSelector(state => state.user.colorTheme);
    const dispatcher = useAppDispatch()
    const navigate = useNavigate()

    function handleLogout() {
        dispatcher(logout())
        navigate('/')
    }

    const onChange = (checked) => {
        if (checked) {
            dispatcher(setTheme('dark'))
        } else {
            dispatcher(setTheme('light'))
        }
    };

    return (
        <div className={classes.settings}>
            <h2>Настройки</h2>
            <div className={classes.settings_field}>
                <div>
                    <h3>Push - уведомления</h3>
                    <div className={classes.settings_field_email}>Письма на почту</div>
                </div>


                <Switch className={classes.switch}></Switch>
            </div>
            <div className={classes.settings_field}>
                <h3>Темная темая</h3>
                <Switch onChange={onChange} checked={colorTheme === 'dark'}></Switch>
            </div>
            <div className={classes.settings_field}>
                <h3>Выйти из аккаунта</h3>
                <span className={classes.settings_logout} onClick={handleLogout}>Выйти</span>
            </div>

        </div>
    )
}

export default Settings