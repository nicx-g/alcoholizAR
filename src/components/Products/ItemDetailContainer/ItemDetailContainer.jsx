import {useEffect, useState} from 'react' 
import './itemDetailContainer.scss';

import ItemDetail from '../ItemDetail/ItemDetail';
import ProductosRecomendados from '../ProductosRecomendados/ProductosRecomendados';
import Container from '../../Global/Container/Container';
import Preloader from '../../Global/Preloader/Preloader'

const ItemDetailContainer = () => {

    const [itemDetail, setItemDetail] = useState(null)
    
    const getProduct = new Promise((resolve, reject) => {

        setTimeout(() => {
            resolve({
                id: 1,
                titulo: "Patagonia Lager",
                descripcionCorta: "Lorem ipsum dolor sit amet consectetur adipisicing.",
                descripcionLarga: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi harum praesentium soluta perferendis eos doloremque exercitationem consequatur placeat quas repudiandae dicta aperiam itaque voluptatem, velit voluptate alias odio deleniti nostrum.",
                precio: 500,
                stock: 24
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