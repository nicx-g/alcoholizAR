import {useContext} from 'react';
import {Store} from '../../store/index';
import {Link} from 'react-router-dom'

import Container from '../Global/Container/Container';

const Cart = () => {
    const [data, setData] = useContext(Store);

    const limpiarCarrito = () => {
        setData({
            cantidad: 0,
            items: []
        })
    }

    const totalPrice = data.items.reduce((acumulador, valor) => {return acumulador + valor.item.precioTotal}, 0).toFixed(2)


    return (
        <div className="cart">
            <Container>
                <div className="cart__vendor">
                    <h1 className="cart__vendor-title">Mi carrito</h1>
                    <h2 className="cart__vendor-subtitle">¡Estas son todas las cervezas que vas a tomar o compartir!</h2>
                </div>
                <div className="cart__wrapperItems">
                    {data.items.length >= 1 ? 
                    data.items.map(prod => {
                        return (
                            <div className="cart__wrapperItems__item">
                        <div className="cart__wrapperItems__item__pic">
                            <img src="https://loremflickr.com/150/150" alt=""/> 
                        </div>
                        <div className="cart__wrapperItems__item__vendor">
                            <h3 className="cart__wrapperItems__item__vendor-title">{prod.item.titulo}</h3>
                            <p className="cart__wrapperItems__item__vendor-description">{prod.item.descripcion}</p>
                            <p className="cart__wrapperItems__item__vendor-qty">{prod.item.cantidadProductos} unidades</p>
                            <p className="cart__wrapperItems__item__vendor-price">${prod.item.precioTotal} ARS</p>
                        </div>
                        <div className="cart__wrapperItems__item__actions">
                            <i className="far fa-plus-square"></i>
                            <i className="fas fa-trash"></i>
                            <i className="far fa-minus-square"></i>
                        </div>
                    </div>
                        )
                    }) : 
                    <div className="sinProductos">
                        <h2>Parece que no tenés ninguna cerveza agregada al carrito, vamos a descubrirlas!</h2>
                        <Link to='/productos'>Hacé click acá para ver todos los productos</Link>
                    </div>}
                </div>
                <div className="cart__totalPrice">
                    <p>${totalPrice} ARS</p>
                </div>
                <div className="cart__actions">
                    <div className="cart__actions__emptyCart">
                        <button onClick={() => limpiarCarrito()}>Vaciar carrito</button>
                    </div>
                    <div className="cart__actions__finish">
                        <button>Siguiente</button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Cart;