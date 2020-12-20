import { useState} from 'react'
import './itemList.scss'

const ItemList = (props) => {

    const [cantidadProductos, setCantidadProductos] = useState(6)

    const itemCountSuma = () => {

        if(cantidadProductos < props.stock) {

            setCantidadProductos( () => parseInt(cantidadProductos) + 6)
            
        } else{

            return
        }
    }

    const itemCountResta = () => {

        if(cantidadProductos < 0 || cantidadProductos === 0) {

            return
            
        } else{

            setCantidadProductos( () => parseInt(cantidadProductos) - 6)
        }
    }

    const [btnSuccess, setBtnSuccess] = useState(false)

    const alternarSuccess = () => {
        setBtnSuccess(true)
        setTimeout(() => {
            setBtnSuccess(false)
        }, 3000)
        
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
                <span className="itemList__variants-stockText">Stock disponible: {props.stock} unidades</span>
                <div className="itemList__variants__options">
                    <button className="itemList__variants__options-itemCount"
                    onClick={itemCountResta}
                    disabled={cantidadProductos === 6 ? "disabled" : null}
                    >-</button>

                    <input className="itemList__variants__options-itemCountInput"
                    type="text" 
                    name="itemCountInput" 
                    readOnly={true}
                    value={cantidadProductos}
                    />

                    <button className="itemList__variants__options-itemCount"
                    onClick={itemCountSuma}
                    disabled={cantidadProductos == props.stock ? "disabled" : null}
                    >+</button>
                </div>
            </div>
            <div className="itemList__price">
                <span>El precio es: ${props.precio}</span>
            </div>
            <div className="itemList__buy">
                <button
                onClick={alternarSuccess}
                className={btnSuccess ? "success" : ""}
                >{btnSuccess ? "Agregado con éxito" : "Agregar al carrito"}</button>
            </div>
        </div>
    )
}

export default ItemList;