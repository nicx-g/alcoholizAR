import {useState} from 'react';
import {getFirestore} from '../../firebase/index';

import Container from '../Global/Container/Container';
import Preloader from '../Global/Preloader/Preloader';

const Ordenes = () => {

    const db = getFirestore();
    const [orderIdInput, setOrderIdInput] = useState("")
    const [order, setOrder] = useState({
        id: '',
        data: {}
    })
    const [utils, setUtils] = useState({
        ordenNoExistente: false,
        loading: false,
    })

    const handleInput = (e) => {
        setOrderIdInput(e.target.value);
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        setUtils({
            ...utils,
            loading: true,
        })
        db.doc(`ordenes/${orderIdInput}`).get()
        .then(product => {
            if(product.exists){
                setOrder({
                    id: product.id,
                    data: product.data()
                })
                setUtils({
                    ordenNoExistente: false,
                    loading: false
                })
                console.log(order)
            }
            else{
                setUtils({
                    ordenNoExistente: true,
                    loading: false
                })
            }
        })
    }

    return(
        <Container>
            <div className="ordenes">
                <div className="ordenes__bienvenida">
                <div className="ordenes__bienvenida__vendor">
                    <h1>Hola! acá podés ver el estado de tus órdenes</h1>
                    <p>Sólo tenés que tenés que ingresar el número de seguimiento que te dimos en la compra, también está en el email que te llegó por si no lo guardaste!</p>
                </div>
                <div className="ordenes__bienvenida__form">
                    <form onSubmit={handleSubmitForm}>
                        <input onKeyUp={handleInput} onBlur={handleInput} type="text" name="ordenId" id="ordenId"/>
                        <button>Ver estado</button>
                    </form>
                </div>
                <div className={`ordenes__bienvenida__noId ${utils.ordenNoExistente ? 'show' : null}`}>
                    <p>No se encontró la orden seleccionada. ¿Ingresó bien el número?</p>
                </div>
                </div>
                {order.id && utils.ordenNoExistente == false? 
                    <div className="ordenes__estado">
                    <div className="ordenes__estado__vendor">
                        <h2>Número de seguimiento: {order.id}</h2>
                        <p>Estado de la compra: <span>{order.data.estado}</span></p>
                    </div>
                    <div className="ordenes__estado__productos">
                        <div className="ordenes__estado__productos__vendor">
                            <h3>Productos</h3>
                        </div>
                        <div className="ordenes__estado__productos__wrapper">
                        {order.data.productos.map(item => {
                            return (
                                <div className="ordenes__estado__productos__wrapper__item">
                                    <img src="https://loremflickr.com/50/100" alt="producto"/>
                                    <div className="ordenes__estado__productos__wrapper__item__vendor">
                                        <h4>{item.item.titulo}</h4>
                                        <p>{item.item.descripcion}</p>
                                        <p>{item.item.cantidadProductos} unidades</p>
                                        <p>${item.item.precioTotal}</p>
                                    </div>
                                </div>
                        )})}
                        </div>
                        <div className="ordenes__estado__productos__precioTotal">
                            <h3>Precio total: ${order.data.montoTotal}</h3>
                        </div>
                    </div>
                </div> :
                utils.loading ? <Preloader texto="Cargando orden"/> : null
                }
                
            </div>
        </Container>
    )
}

export default Ordenes;