import React, {useEffect} from "react"
import classes from "./ErrorBoundery.module.scss";
import {useNavigate} from "react-router-dom";



function ErrorFallback({error, resetErrorBoundary}) {
    const navigate = useNavigate()
    useEffect(()=>{
        window.onclick = function (){
            return resetErrorBoundary()
        }
    })
    return (
        <div role="alert">
                <div className={classes.error_fallback}>
                    <div className={classes.error_fallback_wrap}>
                        <div className={classes.error_fallback_left}>
                            <p className={classes.error_fallback_title}>Error 404</p>
                            <h2 className={classes.error_fallback_title_big}>Ой, что-то пошло не так</h2>
                            <p className={classes.error_fallback_subtitle}>Не расстраивайтесь, попробуйте заново</p>
                        </div>
                        <div className={classes.error_fallback_right}></div>
                    </div>
                </div>
        </div>
    )
}

export default ErrorFallback