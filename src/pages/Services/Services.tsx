import React from "react"
import {Route, Routes } from "react-router-dom";

function Services ({routes}: any){

    const templateRoutes = routes.map((elem: any,id: any)=>{
        return(
            <Route
                key={id}
                path={elem.path}
                element={elem.component}
            />
        )
    })

    return (
        <div>
            <Routes>
                {templateRoutes}
            </Routes>
        </div>
    )
}


export default Services