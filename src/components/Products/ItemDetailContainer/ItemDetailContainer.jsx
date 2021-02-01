import {useEffect, useState} from 'react' 
import {useParams} from 'react-router-dom';
import {getFirestore} from '../../../firebase/index';

import ItemDetail from '../ItemDetail/ItemDetail';
import ProductosRecomendados from '../ProductosRecomendados/ProductosRecomendados';
import Container from '../../Global/Container/Container';
import Preloader from '../../Global/Preloader/Preloader'

const ItemDetailContainer = () => {

    const {producto_id} = useParams();
    const [itemDetail, setItemDetail] = useState(null)
    const db = getFirestore();
    const [productoNoEncontrado, setProductoNoEncontrado] = useState(false);

    useEffect(() => {
        db.doc(`productos/${producto_id}`).get()
        .then(item => {
            if (item.exists){
                setProductoNoEncontrado(false)
                setItemDetail({
                    item: item.data(),
                    id: item.id
                })
            } else {
                setProductoNoEncontrado(true)
            }
        })
        .catch(error => {
            alert('Algo salió mal, revisá tu conexión o volvelo a intentar más tarde')
            console.log(error)
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [producto_id])
    
    return (
        <div className="itemDetailContainer">
            <Container>
                <div className="itemDetailContainer__wrapper">
                    <div className="itemDetailContainer__wrapper__titulo">
                        <h1>Detalle del producto</h1>
                    </div>
                    <div className="itemDetailContainer__wrapper__itemDetail">
                       {
                           !productoNoEncontrado ?
                            itemDetail ?
                            <ItemDetail
                            props={itemDetail}
                            /> :
                            <Preloader
                            texto="Cargando producto"
                            /> :
                            <div className="itemDetailContainer__wrapper__itemDetail__wrapper">
                                <div className="itemDetailContainer__wrapper__itemDetail__wrapper__noResult">
                                    <h2>Parece que no existe el producto que estás buscando :(</h2>
                                    <p>Te recomendamos que mires los productos que se encuentran más abajo si son de tu interés!</p>
                                    <i className="fas fa-angle-double-down"></i>
                                </div>
                            </div>
                       }
                    </div>
                    <div className="itemDetailContainer__wrapper__productosRecomendados">
                        <ProductosRecomendados/>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ItemDetailContainer;