import { useState} from 'react'
import './itemList.scss'

const ItemList = (props) => {

    return (
        <div className="itemList">
            <div className="itemList__image">
                <img src="https://loremflickr.com/150/150" alt="Cerveza Andes Origen Rubia lata 473ml"/>
            </div>
            <div className="itemList__title">
                <span className="itemList__title-title">{props.titulo}</span>
                <span className="itemList__title-description">{props.descripcion}</span>
            </div>
            <div className="itemList__price">
                <span>El precio es: ${props.precio}</span>
            </div>
            <div className="itemList__detail">
                <button>Ver producto</button>
            </div>
        </div>
    )
}

export default ItemList;