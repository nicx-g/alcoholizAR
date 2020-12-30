import ItemList from '../ItemList/ItemList';
import {useState, useEffect} from 'react'
import Preloader from '../../Global/Preloader/Preloader';
import "./ProductosRecomendados.scss";

const ProductosRecomendados = () => {

    const [items, setItems] = useState([])
    
    const itemsRecomendados = [
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
        }
    ]

    const getItems = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(itemsRecomendados)
        }, 3000)
        
    })

    useEffect(() => {
        getItems.then(rta => setItems(rta))
    }, [])

    return (
        <div className="productosRecomendados">
            <div className="productosRecomendados__vendor">
                <h1>Productos recomendados de esta semana</h1>
            </div>
            <div className="productosRecomendados__itemList">
                {
                    items.length ?
                        <ItemList 
                        productsArray={items}
                        /> :
                    <Preloader
                    texto={"Cargando productos recomendados"}
                    />
                }
            </div>
        </div>
    )
}

export default ProductosRecomendados