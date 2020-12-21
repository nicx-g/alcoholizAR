
import Nav from './components/Global/Navbar/Nav/Nav';
import Container from './components/Global/Container/Container';
import ItemListContainer from './components/Products/itemListContainer/ItemListContainer';
import ItemList from './components/Products/ItemList/ItemList';
import {useState, useEffect} from 'react'
import Preloader from './components/Global/Preloader/Preloader';

function App() {

    const [items, setItems] = useState([])
    
    const products = [
        {
            "id": 1,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 2,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 3,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 4,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 5,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 6,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 7,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
        {
            "id": 8,
            "titulo": "Andes Origen",
            "descripcion": "Cerveza Andes Origen Rubia Lata 473ml",
            "stock": 60,
            "precio": 430
        },
    ]
    
    const getProducts = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(products)
        }, 3000)
        
    })

    useEffect(() => {
        getProducts.then(rta => setItems(rta))
    }, [])

    useEffect(() => {
        items.map(item => console.log(item))
    }, [items])
      
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
                            descripcion={item.descripcion}
                            stock={item.stock} 
                            precio={item.precio}
                            />
                        )) :
                        <Preloader
                        texto={"Cargando productos"}
                        />
                    }
                </ItemListContainer>
            </Container>
        </div>
        </>
    )
}

export default App;
