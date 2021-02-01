import {useContext} from 'react';
import {StoreContext} from '../../../../store/storeContext';

import {NavLink} from 'react-router-dom';

const CartWidget = ({showHide}) => {

    const storeContext = useContext(StoreContext)
    const {data, deleteOnCart} = storeContext;

    return (
        <div 
        className={`overlay ${showHide ? 'show' : 'hide'}`}>
            <div 
            className={`cartWidget ${showHide ? 'show' : 'hide'}`}>
                <div className="cartWidget__vendor">
                    <h3 className="cartWidget__vendor-titulo">Mis futuras cervezas</h3>
                </div>

                <div className="cartWidget__items">
                    {data.items.length >= 1 ?
                     data.items.map(item => {
                        return (
                            <div className="cartWidget__items__item" key={item.id}>
                                <div className="cartWidget__items__item__wrapper">
                                    <div className="cartWidget__items__item__wrapper__img">
                                        <img src="https://loremflickr.com/50/100" alt="producto"/>
                                    </div>
                                    <div className="cartWidget__items__item__wrapper__detail">
                                        <h4>{item.item.titulo}</h4>
                                        <p>{item.item.descripcion}</p>
                                        <p>{item.item.cantidadProductos} unidades</p>
                                        <p>${item.item.precioTotal}</p>
                                    </div>
                                </div>
                                <div className="cartWidget__items__item__delete">
                                    <i 
                                    onClick={() => deleteOnCart(item)}
                                    className="fas fa-trash"></i>
                                </div>
                            </div>
                        )
                    }) :
                    <div className="cartWidget__items__noItems">
                        <h2>¿Qué vamos a tomar hoy? ¿Una Patagonia te viene bien?</h2>
                    </div>
                    }
                    
                </div>

                <div className="cartWidget__goToCart">
                    <NavLink to='/cart'>Ir al carrito</NavLink>
                </div>
            </div>
        </div>
    )
}

export default CartWidget;