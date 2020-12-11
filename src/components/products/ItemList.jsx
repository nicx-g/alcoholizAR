import { useState} from 'react'
import './itemList.scss'

const ItemList = (props) => {

    const [cantidadProductos, setCantidadProductos] = useState(6)

    const itemCountSuma = (e) => {

        if(cantidadProductos == props.stock) {
            e.target.disabled = true;
            e.target.classList.add('active')

            setTimeout(() => {
                e.target.disabled = false;
                e.target.classList.remove('active')
            }, 1500);
        } else{

            e.target.disabled = false
            setCantidadProductos(() => {
                return parseInt(cantidadProductos) + 6
            })
        }
    }

    const itemCountResta = (e) => {

        if(cantidadProductos < 0 || cantidadProductos == 0) {
            e.target.disabled = true;
            e.target.classList.add('active')

            setTimeout(() => {
                e.target.disabled = false;
                e.target.classList.remove('active')
            }, 1500);

        } else{

            e.target.disabled = false
            setCantidadProductos(() => {
                return parseInt(cantidadProductos) - 6
            })
        }
    }

    return (
        <div className="itemList">
            <div className="itemList__image">
                <img src="https://via.placeholder.com/150x150" alt="Cerveza Andes Origen Rubia lata 473ml"/>
            </div>
            <div className="itemList__title">
                <span className="itemList__title-title">{props.titulo}</span>
                <span className="itemList__title-description">{props.descripcion}</span>
            </div>
            <div className="itemList__variants">
                <span className="itemList__variants-text">¿Cuántas unidades?</span>
                <span className="itemList__variants-subText">Sólo múltiplos de 6</span>
                <span className="itemList__variants-stockText">Stock disponible: {props.stock}</span>
                <div className="itemList__variants__options">
                    <button className="itemList__variants__options-itemCount"
                    onClick={itemCountResta}
                    >-</button>

                    <input className="itemList__variants__options-itemCountInput"
                    type="text" 
                    name="itemCountInput" 
                    readOnly={true}
                    value={cantidadProductos}
                    />

                    <button className="itemList__variants__options-itemCount"
                    onClick={itemCountSuma}
                    >+</button>
                </div>
            </div>
            <div className="itemList__price">
                <span>El precio es: ${props.precio}</span>
            </div>
            <div className="itemList__buy">
                <button>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ItemList;