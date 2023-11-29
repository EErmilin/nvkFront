import { useEffect } from "react"
import classes from "./PersonalArea.module.scss";
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import NavBar from "../../../components/NavBar/NavBar";


function PersonalArea({ routes }) {
    const navigate = useNavigate()
    const urlParams = useParams()


    useEffect(() => {
        if (!urlParams['*'].length) {
            navigate("profile")
        }
    })

    const templateRoutes = routes.map(({ path = '', component, exact }, key) => {
        return (
            <Route
                path={path}
                exact={exact}
                key={key}
                element={component}
            />
        )
    })

    return (
        <div className={classes.wrap}>
            <div className={classes.container}>
                <div className={classes.navbar}>
                    <NavBar />
                </div>
                <div className={classes.content}>
                    <Routes>
                        {templateRoutes}
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default PersonalArea