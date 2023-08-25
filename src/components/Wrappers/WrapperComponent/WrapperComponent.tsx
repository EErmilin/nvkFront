
interface WrapperComponentProps {
    children: React.ReactNode

}
function WrapperComponent ({children}: WrapperComponentProps) {

    return (
            <div className="container style__flexbox style__flexdirection-column">
                {children}
            </div>
    )
}

export default WrapperComponent