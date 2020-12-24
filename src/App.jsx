import {useState, useEffect} from 'react'

import Nav from './components/Global/Navbar/Nav/Nav';
import Container from './components/Global/Container/Container';
import ItemListContainer from './components/Products/itemListContainer/ItemListContainer';
import ItemList from './components/Products/ItemList/ItemList';
import Preloader from './components/Global/Preloader/Preloader';
import ItemDetailContainer from './components/Products/ItemDetailContainer/ItemDetailContainer'

function App() {

    const [items, setItems] = useState([])
    
    const products = [
        {
            "id": 1,
            "titulo": "Andes Origen",
            "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 2,
            "titulo": "Andes Origen",
            "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 3,
            "titulo": "Andes Origen",
            "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 4,
            "titulo": "Andes Origen",
            "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 5,
            "titulo": "Andes Origen",
            "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 6,
            "titulo": "Andes Origen",
            "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 7,
            "titulo": "Andes Origen",
            "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 8,
            "titulo": "Andes Origen",
            "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
    ]

    const itemDetail = {
        "id": 10,
        "titulo": "Andes Origen",
        "descripcionCorta": "Cerveza Andes Origen Rubia Lata 473ml",
        "descripcionLarga": "Cerveza Andes Origen Rubia Lata 473ml Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi exercitationem accusantium deserunt unde, vel laudantium neque provident rerum magni nostrum facere debitis commodi at eius suscipit! Quam earum impedit ipsa.",
        "stock": 60,
        "precio": 430
    }
    
    const getProducts = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products)
        }, 3000)
        
    })

    useEffect(() => {
        getProducts.then(rta => setItems(rta))
    }, [])
      
    return (
        <>
        <Nav/>
        <div className="productos">
            <Container>
                <ItemListContainer
                className={items.length ? "itemListContainer" : "loading"}
                >
                    {
                        items.length ?
                        items.map(item => (
                            <ItemList 
                            key={item.id}
                            titulo={item.titulo}
                            descripcion={item.descripcionCorta}
                            stock={item.stock} 
                            precio={item.precio}
                            />
                        )) :
                        <Preloader
                        texto={"Cargando productos"}
                        />
                    }
                </ItemListContainer>
                <ItemDetailContainer/>
            </Container>
        </div>
        </>
    )
}

export default App;
