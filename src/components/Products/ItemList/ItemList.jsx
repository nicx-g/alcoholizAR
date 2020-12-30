import {NavLink} from 'react-router-dom';
import Preloader from '../../Global/Preloader/Preloader';

import './itemList.scss';

const ItemList = ({productsArray, productsCategory}) => {

    const productItems = productsCategory ?
    productsArray.length > 0 && productsArray.filter(product => (product.categoria === productsCategory)) :
    productsArray;
    
    return (
        <>
            {
                productItems ?
                productItems.length && productItems.map((product) => {
                    return (
                        <div key={product.id} className="itemList">
                            <div className="itemList__image">
                                <img src="https://loremflickr.com/150/150" alt="Cerveza Andes Origen Rubia lata 473ml"/>
                            </div>
                            <div className="itemList__title">
                                <span className="itemList__title-title">{product.titulo}</span>
                                <span className="itemList__title-description">{product.descripcion}</span>
                            </div>
                            <div className="itemList__price">
                                <span>El precio es: ${product.precio}</span>
                            </div>
                            <div className="itemList__detail">
                                <NavLink to={`/detail/${product.id}`}>Ver producto</NavLink>
                            </div>
                        </div>
                    )
                }) :
                <Preloader texto="Cargando productos..." />
            }
        </>
    )
}

export default ItemList;