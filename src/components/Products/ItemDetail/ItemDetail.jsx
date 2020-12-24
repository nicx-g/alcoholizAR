import { useState} from 'react'
import './itemDetail.scss'

const ItemDetail = ({props}) => {

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
        <div className="itemDetail">
            <div className="itemDetail__wrapper">
                <div className="itemDetail__wrapper__image">
                    <img src="https://via.placeholder.com/300x300" alt="Cerveza Andes Origen Rubia lata 473ml"/>
                </div>
                <div className="itemDetail__wrapper__title">
                    <span className="itemDetail__wrapper__title-title">{props.titulo}</span>
                    <span className="itemDetail__wrapper__title-description">{props.descripcionLarga}</span>
                </div>
            </div>
            <div className="itemDetail__wrapper">
                <div className="itemDetail__wrapper__variants">
                    <span className="itemDetail__wrapper__variants-text">¿Cuántas unidades?</span>
                    <span className="itemDetail__wrapper__variants-subText">Sólo múltiplos de 6</span>
                    <span className="itemDetail__wrapper__variants-stockText">Stock disponible: {props.stock} unidades</span>
                    <div className="itemDetail__wrapper__variants__options">
                        <button className="itemDetail__wrapper__variants__options-itemCount"
                        onClick={itemCountResta}
                        disabled={cantidadProductos === 6 ? "disabled" : null}
                        >-</button>
                
                        <input className="itemDetail__wrapper__variants__options-itemCountInput"
                        type="text" 
                        name="itemCountInput" 
                        readOnly={true}
                        value={cantidadProductos}
                        />
                
                        <button className="itemDetail__wrapper__variants__options-itemCount"
                        onClick={itemCountSuma}
                        disabled={cantidadProductos == props.stock ? "disabled" : null}
                        >+</button>
                    </div>
                </div>
                <div className="itemDetail__wrapper__price">
                    <span>El precio es: ${props.precio}</span>
                </div>
                <div className="itemDetail__wrapper__buy">
                    <button
                    onClick={alternarSuccess}
                    className={btnSuccess ? "success" : ""}
                    >{btnSuccess ? "Agregado con éxito" : "Agregar al carrito"}</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;