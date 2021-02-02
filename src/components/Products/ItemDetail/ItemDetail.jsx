import {useState, useContext, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import {useHistory} from 'react-router-dom';

import {StoreContext} from '../../../store/storeContext';

const ItemDetail = ({props}) => {

    const storeContext = useContext(StoreContext);
    const {data, stock, setearStock, agregarAlCarrito, productosVendidos} = storeContext;
    const history = useHistory();
    const {producto_id} = useParams();
    
    const [cantidadProductos, setCantidadProductos] = useState(0);
    const [btnSuccess, setBtnSuccess] = useState(false);
    const [showGoToCart, setShowGoToCart] = useState(false);

    const itemCountSuma = () => {
        if(cantidadProductos < stock) {
            setCantidadProductos( () => parseInt(cantidadProductos) + 6)
        } else{
            return
        }
    };

    const itemCountResta = () => {
        if(cantidadProductos < 0 || cantidadProductos === 0) {
            return
        } else{
            setCantidadProductos( () => parseInt(cantidadProductos) - 6)
        }
    };

    const alternarSuccess = () => {
        setBtnSuccess(true)
        goToCartBtnShow();
        setTimeout(() => {
            setBtnSuccess(false)
        }, 1500)
    };

    const goToCartBtnShow = () => setShowGoToCart(true);

    const GoToCartRedirect = () => history.push('/cart');

    const onAdd = () => {
        alternarSuccess();
        agregarAlCarrito(props, cantidadProductos)
        setCantidadProductos(0);
    };
    
    useEffect(() => {
        setearStock(props, productosVendidos);
        document.title=`${props.item.descripcion} | AlcoholizAR`
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [producto_id, props, productosVendidos, data]);

    return (
        <div className="itemDetail">
            <div className="itemDetail__wrapper">
                <div className="itemDetail__wrapper__image">
                    <img src={`/resources/images/${props.item.foto}`} alt={props.item.descripcion}/>
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
                        disabled={cantidadProductos === parseFloat(stock)? "disabled" : null}
                        >+</button>
                    </div>
                </div>
                <div className="itemDetail__wrapper__price">
                    <span>${props.item.precio}</span>
                </div>
                <div className="itemDetail__wrapper__buy">
                    <button
                    disabled={btnSuccess || stock === 0 || cantidadProductos === 0  ? 'disabled' : null}
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
};

export default ItemDetail;