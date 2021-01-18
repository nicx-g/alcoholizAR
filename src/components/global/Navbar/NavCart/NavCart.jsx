import {useContext, useEffect, useState} from 'react';

import {Store} from '../../../../store/index';

const CardWidget = ({showHide}) => {

    const [data, setData] = useContext(Store);

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