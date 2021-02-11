import {useContext} from 'react';
import {Link} from 'react-router-dom';
import {StoreContext} from '../../../store/storeContext';

const ItemList = ({productsArray, productsCategory}) => {

    const storeContext = useContext(StoreContext);
    const {productosVendidos} = storeContext;

    const productItems = productsCategory ?
    productsArray.length > 0 && productsArray.filter(product => (product.item.categoria === productsCategory)) :
    productsArray;
    
    return (
        <>
            {
                productItems.length > 1 ?
                productItems.map((product) => {

                    let productoActualVendido = productosVendidos ? productosVendidos.filter(item => item.id === product.id) : null
                    let cantidadProductosVendidos = productoActualVendido ? productoActualVendido.reduce((acumulador, producto) => {return acumulador + producto.item.cantidadProductos}, 0) : null
                    
                    return (
                        <div key={product.id} className="itemList">
                            <div className="itemList__image">
                                <img src={`/resources/images/${product.item.foto}`} alt={product.item.descripcion}/>
                            </div>
                            <div className="itemList__title">
                                <span className="itemList__title-title">{product.item.titulo}</span>
                                <span className="itemList__title-description">{product.item.descripcion}</span>
                            </div>
                            <div className="itemList__price">
                                <span>El precio es: ${product.item.precio}</span>
                            </div>
                            <div className="itemList__detail">
                                <Link to={`/${product.item.categoria}/${product.id}`}>Ver producto</Link>
                            </div>
                            {product.item.stock - cantidadProductosVendidos === 0 ? 
                            <div className="itemList__noStock">
                                <p>Sin stock :(</p>
                            </div> : 
                            null}
                            {product.item.stock - cantidadProductosVendidos <= 24 && product.item.stock - cantidadProductosVendidos > 1 ?
                            <div className="itemList__pocoStock">
                                <p>¡Hay poco stock!</p>
                            </div>:
                            null}
                        </div>
                    )
                }) :
                <div className="noItems">
                    <h2>No se encontraron productos en esta categoría :(</h2>
                </div>
            }
        </>
    )
}

export default ItemList;