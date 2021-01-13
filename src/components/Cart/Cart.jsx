import {useContext} from 'react';
import {Store} from '../../store/index';


const Cart = () => {
    const [data, setData] = useContext(Store);

    return (
        data.items.map(item => {
            return (
                <h1>{item.titulo}</h1>
            )
        })
    )
}

export default Cart;