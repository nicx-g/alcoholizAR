import './cartWidget.scss'
import ItemList from '../../../Products/ItemList/ItemList'

const CartWidget = ({showHide}) => {
    return (
        <div 
        className={`overlay ${showHide ? 'show' : 'hide'}`}>
            <div 
            className={`cartWidget ${showHide ? 'show' : 'hide'}`}>
                <ItemList/>
            </div>
        </div>
    )
}

export default CartWidget;