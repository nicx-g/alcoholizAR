import {useContext} from 'react';
import {Store} from '../../../../store/index';

import {NavLink} from 'react-router-dom';

const CartWidget = ({showHide}) => {

    const [data, setData] = useContext(Store)
    
    return (
        <div 
        className={`overlay ${showHide ? 'show' : 'hide'}`}>
            <div 
            className={`cartWidget ${showHide ? 'show' : 'hide'}`}>
                <div className="cartWidget__vendor">
                    <h3 className="cartWidget__vendor-titulo">Mis futuras cervezas</h3>
                </div>

                <div className="cartWidget__items">
                    {data.items.map(item => {
                        return (
                            <div className="cartWidget__items__item">
                                <div className="cartWidget__items__item__wrapper">
                                    <div className="cartWidget__items__item__wrapper__img">
                                        <img src="https://loremflickr.com/50/100" alt="producto"/>
                                    </div>
                                    <div className="cartWidget__items__item__wrapper__detail">
                                        <h4>{item.data.titulo}</h4>
                                        <p>{item.data.descripcion}</p>
                                        <p>{item.cantidadProductos} unidades</p>
                                        <p>${item.data.precio}</p>
                                    </div>
                                </div>
                                <div className="cartWidget__items__item__delete">
                                    <i className="fas fa-trash"></i>
                                </div>
                            </div>
                        )
                    })}
                    
                </div>

                <div className="cartWidget__goToCart">
                    <NavLink to='/cart'>Ir al carrito</NavLink>
                </div>
            </div>
        </div>
    )
}

export default CartWidget;