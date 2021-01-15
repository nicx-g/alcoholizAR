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

    useEffect(() => {
        db.doc(`productos/${producto_id}`).get()
        .then(item => {
            if (item.exists){
                setItemDetail(item.data())
            } else {
                alert('Todavía no tenemos este producto, te habrás equivocado? si no es así, pronto lo tendremos!')
            }
        })
        .catch(error => console.log('Algo salió mal, revisá tu conexión o volvelo a intentar más tarde'))
    }, [])
    
    return (
        <div className="itemDetailContainer">
            <Container>
                <div className="itemDetailContainer__wrapper">
                    <div className="itemDetailContainer__wrapper__titulo">
                        <h1>Detalle del producto</h1>
                    </div>
                    <div className="itemDetailContainer__wrapper__itemDetail">
                       {
                            itemDetail ?
                            <ItemDetail
                            props={itemDetail}
                            /> :
                            <Preloader
                            texto="Cargando producto"
                            />
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