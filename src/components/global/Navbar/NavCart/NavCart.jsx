import {useContext} from 'react';

import {Store} from '../../../../store/index';

const CardWidget = ({showHide}) => {

    const [data, setData] = useContext(Store);
    
    return  (
    <div className="nav__actions__cart">
        <button onClick={showHide}>
            <i className="fas fa-shopping-cart">
                <span>{data.cantidad}</span>
            </i>
        </button>
    </div>
    )
};

export default CardWidget;