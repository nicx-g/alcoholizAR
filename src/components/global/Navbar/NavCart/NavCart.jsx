import './navCart.scss'

const CardWidget = ({showHide}) => {
    return  (
    <div className="nav__actions__cart">
        <button onClick={showHide}>
            <i className="fas fa-shopping-cart">
                <span>0</span>
            </i>
        </button>
    </div>
    )
};

export default CardWidget;