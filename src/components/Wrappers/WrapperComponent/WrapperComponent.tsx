import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import React from 'react'
import { useLocation } from "react-router-dom";

interface WrapperComponentProps {
    children: React.ReactNode

}
function WrapperComponent({ children }: WrapperComponentProps) {

  const url = useLocation()

  const cls = ["container style__flexbox style__flexdirection-column"]
  if(url.pathname === "/horoscope"){
    cls.push("horoscope")
  }
    return (
        <>
            <Header />
            <div className={cls.join(" ")}>
                {children}
            </div>
            <Footer />
        </>
    )
} 

export default WrapperComponent;