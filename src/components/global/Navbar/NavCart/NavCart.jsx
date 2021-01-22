import {useContext, useEffect, useState} from 'react';

import {StoreContext} from '../../../../store/storeContext';

const CardWidget = ({showHide}) => {

    const storeContext = useContext(StoreContext)
    const {data} = storeContext;

    const [productOnCart, setProductOnCart] = useState("");
    const [dataUp, setDataUp] = useState("");
    
    useEffect(() => {
        setProductOnCart("productOnCart");
        setDataUp("dataUp");

        setTimeout(() => {
            setDataUp("");
            setProductOnCart("");
        }, 1100)
        
    }, [data])

    return  (
    <div className="nav__actions__cart">
        <button onClick={showHide}>
            <i className={`fas fa-shopping-cart ${productOnCart}`}>
                <p className={dataUp}>{data.cantidad}</p>
            </i>
        </button>
    </div>
    )
};

export default CardWidget;