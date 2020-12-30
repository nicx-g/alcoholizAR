import {useState ,useEffect} from 'react';
import {useParams} from 'react-router-dom';

import ItemList from '../Products/ItemList/ItemList';
import Preloader from '../Global/Preloader/Preloader';
import ItemListContainer from '../Products/itemListContainer/ItemListContainer';
import Container from '../Global/Container/Container';


const Category = () => {

    const {productos_cerveza} = useParams();

    const [productsArray, setProductsArray] = useState([])

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

    const getProducts = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products);
        }, 2000)
    })

    useEffect(() => {
        getProducts.then(rta => setProductsArray(rta));
    }, []);


    return (
        <div className="productos">
            <Container>
                <ItemListContainer
                className={productsArray.length ? "itemListContainer" : "loading"}
                >
                    {
                        productsArray.length ?
                            <ItemList 
                            productsArray={productsArray}
                            productsCategory={productos_cerveza}
                            /> :
                        <Preloader
                        texto={"Cargando productos"}
                        />
                    }
                </ItemListContainer>
            </Container>
        </div>
    )
}

export default Category;