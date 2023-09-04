import React from "react";
import {Navigate, useLocation} from "react-router-dom"
import { useAppSelector } from "../../redux/hooks";

/**
 * Промежуточный компонент отслеживания приватных маршрутов
 * @param path
 * @param exact
 * @param element
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */

function PrivateRoute ({
    path,
    exact,
    element,
    children,
    userRoles,
    ...rest
}){
    const isAuth = useAppSelector(state => state.auth.logged);

    if (!isAuth) {
        return <Navigate to="/" />
    }

    return children

}

export default PrivateRoute