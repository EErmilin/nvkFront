import React, { useEffect } from "react"
import {Route, Routes, useNavigate, useParams } from "react-router-dom";
import NavMenu from "./NavMenu/NavMenu";
import classes from "./Admin.module.scss";
import { useAppSelector } from "../redux/hooks";

function Admin ({routes}){
    const isAuth = useAppSelector(state => state.auth.logged);
    const urlParams = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!urlParams['*'].length) {
            navigate("/admin/films/all")
        }
    })


    const templateRoutes = routes.map((elem,id)=>{
        return(
            <Route
                key={id}
                path={elem.path}
                element={elem.component}
            />
        )
    })

    useEffect(()=>{
        if(!isAuth){
            navigate('/')
        }
    })
    if(!isAuth)return

    return (
        <div className={classes.wrp}>
            
            <NavMenu></NavMenu>
            <Routes>
                {templateRoutes}
            </Routes>
        </div>
    )
}


export default Admin