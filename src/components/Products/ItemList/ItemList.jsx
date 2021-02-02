import {Link} from 'react-router-dom';

const ItemList = ({productsArray, productsCategory}) => {

    const productItems = productsCategory ?
    productsArray.length > 0 && productsArray.filter(product => (product.data.categoria === productsCategory)) :
    productsArray;
    
    return (
        <>
            {
                productItems.length > 1 ?
                productItems.map((product) => {
                    return (
                        <div key={product.id} className="itemList">
                            <div className="itemList__image">
                                <img src={`/resources/images/${product.data.foto}`} alt={product.data.descripcion}/>
                            </div>
                            <div className="itemList__title">
                                <span className="itemList__title-title">{product.data.titulo}</span>
                                <span className="itemList__title-description">{product.data.descripcion}</span>
                            </div>
                            <div className="itemList__price">
                                <span>El precio es: ${product.data.precio}</span>
                            </div>
                            <div className="itemList__detail">
                                <Link to={`/${product.data.categoria}/${product.id}`}>Ver producto</Link>
                            </div>
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