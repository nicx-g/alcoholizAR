import {useState ,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {getFirestore} from '../../firebase/index';

import ItemList from '../Products/ItemList/ItemList';
import Preloader from '../Global/Preloader/Preloader';
import ItemListContainer from '../Products/ItemListContainer/ItemListContainer';
import Container from '../Global/Container/Container';


const Category = () => {

    const {productos_cerveza} = useParams();
    const [productsArray, setProductsArray] = useState([])
    const db = getFirestore();

    const getProductsFromDb = () => {
        db.collection('productos').get()
        .then(docs => {
            let arr = []
            docs.forEach(items => {
                arr.push(
                    {
                        id: items.id, 
                        item: items.data()
                    });
            })
            setProductsArray(arr)
        })
        .catch(e => {
            console.log(e);
            alert('Algo salió mal! revisá tu conexión o volvé a intentarlo más tarde');
        })
    }

    useEffect(() => {
        getProductsFromDb();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        document.title= productos_cerveza ? `${productos_cerveza} | AlcoholizAR` : 'AlcoholizAR';
    }, [productos_cerveza])
    
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