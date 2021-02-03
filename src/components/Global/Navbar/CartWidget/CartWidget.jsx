import {useContext} from 'react';
import {StoreContext} from '../../../../store/storeContext';

import {Link} from 'react-router-dom';

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
                     data.items.map(prod => {
                        return (
                            <div className="cartWidget__items__item" key={prod.id}>
                                <div className="cartWidget__items__item__wrapper">
                                    <div className="cartWidget__items__item__wrapper__img">
                                        <img src={`/resources/images/${prod.item.foto}`} alt={prod.item.foto}/>
                                    </div>
                                    <div className="cartWidget__items__item__wrapper__detail">
                                        <h4>{prod.item.titulo}</h4>
                                        <p>{prod.item.descripcion}</p>
                                        <p>{prod.item.cantidadProductos} unidades</p>
                                        <p>${prod.item.precioTotal}</p>
                                    </div>
                                </div>
                                <div className="cartWidget__items__item__delete">
                                    <i 
                                    onClick={() => deleteOnCart(prod)}
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
                    <Link to='/cart'>Ir al carrito</Link>
                </div>
            </div>
        </div>
    )
}

export default CartWidget;