import './cartWidget.scss'

const CardWidget = () => {
    return  (
    <div className="nav__actions__cart">
        <button>
            <i className="fas fa-shopping-cart">
                <span>0</span>
            </i>
        </button>
    </div>
    )
};

export default CardWidget;