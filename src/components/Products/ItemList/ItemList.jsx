import {Link} from 'react-router-dom';
import Preloader from '../../Global/Preloader/Preloader';

const ItemList = ({productsArray, productsCategory}) => {

    const productItems = productsCategory ?
    productsArray.length > 0 && productsArray.filter(product => (product.data.categoria === productsCategory)) :
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
                                <span className="itemList__title-title">{product.data.titulo}</span>
                                <span className="itemList__title-description">{product.data.descripcion}</span>
                            </div>
                            <div className="itemList__price">
                                <span>El precio es: ${product.data.precio}</span>
                            </div>
                            <div className="itemList__detail">
                                <Link to={`/detail/${product.id}`}>Ver producto</Link>
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