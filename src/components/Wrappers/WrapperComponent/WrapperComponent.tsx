import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";
import React from 'react'

interface WrapperComponentProps {
    children: React.ReactNode

}
function WrapperComponent({ children }: WrapperComponentProps) {

    return (
        <>
            <Header />
            <div className="container style__flexbox style__flexdirection-column">
                {children}
            </div>
            <Footer />
        </>
    )
} 

export default WrapperComponent;