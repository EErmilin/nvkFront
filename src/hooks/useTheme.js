import { useState, useLayoutEffect } from "react";

export default function useTheme() {

    const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'light')

    useLayoutEffect(()=>{
        document.documentElement.setAttribute("data-theme", theme)
        localStorage.setItem('app-theme', theme)
    })

    return {theme, setTheme}

}