import './container.scss'

const container = ({children}) => {
    return (
    <div className="container">
        {children}
    </div>
    )
}

export default container;