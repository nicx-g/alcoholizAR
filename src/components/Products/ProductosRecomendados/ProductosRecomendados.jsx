import {getFirestore} from '../../../firebase/index';
import {useState, useEffect} from 'react'

import ItemList from '../ItemList/ItemList';
import Preloader from '../../Global/Preloader/Preloader';


const ProductosRecomendados = () => {

    const [items, setItems] = useState([])
    const db = getFirestore();
    
    const getItemsFromDb = () => {
        db.collection("productos")
        .where("recomendado", "==", true).get()
        .then(data => {
            let arr = [];
            data.forEach(item => {
                arr.push({
                    id: item.id,
                    item: item.data()
                });
            });
            setItems(arr)
        })
        .catch(error => {
            console.log(error);
            alert('algo salió mal, revisa tu conexión o intentá de nuevo más tarde');
        })
    };
    
     useEffect(() => {
        getItemsFromDb();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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