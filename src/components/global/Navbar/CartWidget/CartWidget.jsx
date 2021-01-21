import {useContext} from 'react';
import {Store} from '../../../../store/index';

import {NavLink} from 'react-router-dom';

const CartWidget = ({showHide}) => {

    const [data, setData] = useContext(Store)

    const acumulador = (acumulador, objeto) => {
        return acumulador + objeto.item.cantidadProductos
    }
    
    const deleteOnCart = (id) => {
        let newProducts = data.items.filter(item => (item.id !== id))
        setData({...data,
            items: newProducts,
            cantidad: data.cantidad - data.items.filter(item => (item.id !== id))
        })
    };

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
                                    onClick={() => deleteOnCart(item.id)}
                                    className="fas fa-trash"></i>
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