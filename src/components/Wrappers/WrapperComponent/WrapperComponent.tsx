
interface WrapperComponentProps {
    children: React.ReactNode

}
function WrapperComponent ({children}: WrapperComponentProps) {

    return (
            <div className="style__flexbox style__flexdirection-column">
                {children}
            </div>
    )
}

export default WrapperComponent