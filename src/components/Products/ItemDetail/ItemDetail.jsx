import {useState, useContext, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

import {Store} from '../../../store/index';

const ItemDetail = ({props}) => {

    let history = useHistory();
    const [cantidadProductos, setCantidadProductos] = useState(0);
    const [btnSuccess, setBtnSuccess] = useState(false);
    const [showGoToCart, setShowGoToCart] = useState(false);
    const [stock, setStock] = useState(props.item.stock)
    const [data, setData] = useContext(Store);

    const itemCountSuma = () => {

        if(cantidadProductos < stock) {
            setCantidadProductos( () => parseInt(cantidadProductos) + 6)
        } else{
            return
        }
    }

    const itemCountResta = () => {
        if(cantidadProductos < 0 || cantidadProductos === 0) {
            return
        } else{
            setCantidadProductos( () => parseInt(cantidadProductos) - 6)
        }
    }

    const alternarSuccess = () => {
        setBtnSuccess(true)
        goToCartBtnShow();
        setTimeout(() => {
            setBtnSuccess(false)
        }, 1500)
    }

    const goToCartBtnShow = () => setShowGoToCart(true);

    const GoToCartRedirect = () => history.push('/cart')

    const finder = item => item.id === props.id;

    
    const onAdd = () => {
        alternarSuccess();

        if(data.items.find(item => item.id === props.id)){


            data.items[data.items.findIndex(finder)].item.cantidadProductos = data.items[data.items.findIndex(finder)].item.cantidadProductos + cantidadProductos

            setData({...data})

            setStock(() => stock - cantidadProductos)
        
        } else {

            props.item.cantidadProductos = cantidadProductos;
            setData({...data, 
                items: [...data.items, props],
                cantidad: data.cantidad + cantidadProductos
            });

            setStock(() => stock - cantidadProductos)
        };
        setCantidadProductos(0);
    };
    
    useEffect(() => {
        if(data.items.length > 0){
            setStock(() => stock - data.items[data.items.findIndex(finder)].item.cantidadProductos)
        }
    }, [])

    return (
        <div className="itemDetail">
            <div className="itemDetail__wrapper">
                <div className="itemDetail__wrapper__image">
                    <img src="https://loremflickr.com/300/300" alt="Cerveza Andes Origen Rubia lata 473ml"/>
                </div>
                
            </div>
            <div className="itemDetail__wrapper">
                <div className="itemDetail__wrapper__title">
                    <span className="itemDetail__wrapper__title-title">{props.item.titulo}</span>
                    <span className="itemDetail__wrapper__title-description">{props.item.descripcion}</span>
                </div>
                <div className="itemDetail__wrapper__variants">
                    <span className="itemDetail__wrapper__variants-text">¿Cuántas unidades?</span>
                    <span className="itemDetail__wrapper__variants-subText">Sólo múltiplos de 6</span>
                    <span className="itemDetail__wrapper__variants-stockText">Stock disponible: {stock} unidades</span>
                    <div className="itemDetail__wrapper__variants__options">
                        <button className="itemDetail__wrapper__variants__options-itemCount"
                        onClick={itemCountResta}
                        disabled={cantidadProductos === 6 || cantidadProductos === 0? "disabled" : null}
                        >-</button>
                
                        <input className="itemDetail__wrapper__variants__options-itemCountInput"
                        type="text" 
                        name="itemCountInput" 
                        readOnly={true}
                        value={cantidadProductos}
                        />
                
                        <button className="itemDetail__wrapper__variants__options-itemCount"
                        onClick={itemCountSuma}
                        disabled={cantidadProductos == stock? "disabled" : null}
                        >+</button>
                    </div>
                </div>
                <div className="itemDetail__wrapper__price">
                    <span>${props.item.precio}</span>
                </div>
                <div className="itemDetail__wrapper__buy">
                    <button
                    disabled={btnSuccess || stock == 0  ? 'disabled' : null}
                    onClick={onAdd}
                    className={btnSuccess ? "success" : ""}
                    >{btnSuccess ? "Agregado con éxito" : "Agregar al carrito"}</button>
                </div>
                <div className="itemDetail__wrapper__goToCart">
                    <button
                    onClick={GoToCartRedirect}
                    className={showGoToCart ? "show" : ""}
                    >Ver carrito</button>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;