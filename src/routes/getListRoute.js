import React from "react";
import {Route} from "react-router-dom";
import WrapperComponent from "../components/Wrappers/WrapperComponent/WrapperComponent";



/**
 * На входе массив с инфой о роутах и список ролей юзера
 * на выходе список роутов
 * @param routes
 * @param userRoles
 * @param url
 * @param rest
 * @returns {*}
 */


export function getListRoute (routes){
    return routes.map(({path='',component,exact},key)=>{
        return <Route
                path={path}
                exact={exact}
                element={(<WrapperComponent >{component}</WrapperComponent>)}
                key={key}
            />
    })
}