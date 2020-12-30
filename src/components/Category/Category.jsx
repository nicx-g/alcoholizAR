import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

const Category = () => {

    const {productos_cerveza} = useParams();

    useEffect(() => {
        console.log(productos_cerveza)
    }, [productos_cerveza])

}