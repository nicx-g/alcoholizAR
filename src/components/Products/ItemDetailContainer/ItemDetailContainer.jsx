import {useEffect, useState} from 'react' 
import {useParams} from 'react-router-dom';

import ItemDetail from '../ItemDetail/ItemDetail';
import ProductosRecomendados from '../ProductosRecomendados/ProductosRecomendados';
import Container from '../../Global/Container/Container';
import Preloader from '../../Global/Preloader/Preloader'

const ItemDetailContainer = () => {

    const {producto_id} = useParams();
    const [itemDetail, setItemDetail] = useState(null)

    const products = [
        {
            "id": 1,
            "titulo": "Corona",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "categoria": "corona",
            "precio": 430
        },
        {
            "id": 2,
            "titulo": "Quilmes",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 30,
            "categoria": "quilmes",
            "precio": 430
        },
        {
            "id": 3,
            "titulo": "Brahma",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "categoria": "brahma",
            "precio": 430
        },
        {
            "id": 4,
            "titulo": "Patagonia Lager",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "categoria": "patagonia",
            "precio": 430
        },
        {
            "id": 5,
            "titulo": "Stella Artois",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "categoria": "stella-artois",
            "precio": 430
        },
        {
            "id": 6,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "categoria": "andes-origen",
            "precio": 430
        },
        {
            "id": 7,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "categoria": "andes-origen",
            "precio": 430
        },
        {
            "id": 8,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "categoria": "andes-origen",
            "precio": 430
        },
    ]
    
    const getProduct = new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({
                id: products[producto_id - 1].id,
                titulo: products[producto_id - 1].titulo,
                descripcion: products[producto_id - 1].descripcion,
                precio: products[producto_id - 1].precio,
                stock: products[producto_id - 1].stock
            })
        }, 2000)
    })

    useEffect(() => {
        getProduct.then(response => setItemDetail(response))
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