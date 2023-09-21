import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import React, { useEffect } from 'react'


function Audio({ routes }) {


    const templateRoutes = routes.map(({ path = '', component }, key) => {
        return (
            <Route
                path={path}
                key={key}
                element={component}
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

export default Audio