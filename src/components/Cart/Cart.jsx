import {useContext, useEffect} from 'react';
import {StoreContext} from '../../store/storeContext';
import {Link} from 'react-router-dom'

import Container from '../Global/Container/Container';

const Cart = () => {

    const storeContext = useContext(StoreContext)
    const {data, limpiarCarrito, deleteOnCart, sumarMasProductos, restarProductos, productosVendidos} = storeContext;

    useEffect(() => {
        document.title=' Mi carrito | AlcoholiZAR'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

                        let productoActualVendido = productosVendidos ? productosVendidos.filter(item => item.id === prod.id) : null
                        let cantidadProductosVendidos = productoActualVendido ? productoActualVendido.reduce((acumulador, producto) => {return acumulador + producto.item.cantidadProductos}, 0) : null

                        return (
                            <div className="cart__wrapperItems__item" key={prod.id}>
                        <div className="cart__wrapperItems__item__pic">
                            <img src={`/resources/images/${prod.item.foto}`} alt={prod.item.descripcion}/> 
                        </div>
                        <div className="cart__wrapperItems__item__vendor">
                            <h3 className="cart__wrapperItems__item__vendor-title">{prod.item.titulo}</h3>
                            <p className="cart__wrapperItems__item__vendor-description">{prod.item.descripcion}</p>
                            <p className="cart__wrapperItems__item__vendor-qty">{prod.item.cantidadProductos} unidades</p>
                            <p className="cart__wrapperItems__item__vendor-price">${prod.item.precioTotal} ARS</p>
                        </div>
                        <div className="cart__wrapperItems__item__actions">
                            <button
                            disabled={prod.item.cantidadProductos === (prod.item.stock - cantidadProductosVendidos) ? "disabled" : null}
                            onClick={() => sumarMasProductos(prod, productosVendidos)}>
                                <i className="far fa-plus-square"></i>
                            </button>
                            <button
                            onClick={() => deleteOnCart(prod)}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                            <button
                            disabled={prod.item.cantidadProductos === 6 ? "disabled" : null}
                            onClick={() => restarProductos(prod)}
                            >
                                <i className="far fa-minus-square"></i>
                            </button>
                        </div>
                    </div>
                        )
                    }) : 
                    <div className="sinProductos">
                        <h2>Parece que no tenés ninguna cerveza agregada al carrito, vamos a descubrirlas!</h2>
                        <Link to='/'>Hacé click acá para ver todos los productos</Link>
                    </div>}
                </div>
                <div className="cart__totalPrice">
                    <p>${data.precioTotal} ARS</p>
                </div>
                <div className="cart__actions">
                    <div className="cart__actions__emptyCart">
                        <button onClick={() => limpiarCarrito()}>Vaciar carrito</button>
                    </div>
                    <div className="cart__actions__finish">
                        <Link to='/checkout'>Siguiente</Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Cart;