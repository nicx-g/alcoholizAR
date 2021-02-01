import {createContext, useState, useEffect} from 'react';
import {getFirestore} from '../firebase/index';

export const StoreContext = createContext();

const StoreProvider = ({children}) => {

    const [data, setData] = useState({
        items: [],
        cantidad: 0
    });
    const [stock, setStock] = useState(null);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [productosVendidos, setProductosVendidos] = useState(null);
    const db = getFirestore();

    const agregarAlCarrito = (producto, cantidadProductos) => {
        
        const reducer = (acumulador, valor) => {return acumulador + valor.item.cantidadProductos};
        const cantidadProductosTotal = data.items.reduce(reducer, 0);
        const posicionProducto = data.items.findIndex(item => item.id === producto.id);
        
        if(data.items.find(item => item.id === producto.id)){

            data.items[posicionProducto].item.cantidadProductos = data.items[posicionProducto].item.cantidadProductos + cantidadProductos

            let precioProducto = Number(data.items[posicionProducto].item.precioTotal + (cantidadProductos * (producto.item.precio/6))).toFixed(2);

            data.items[posicionProducto].item.precioTotal = Number(precioProducto);
            data.cantidad = cantidadProductosTotal + cantidadProductos

            setData({...data})

            setStock(stock - cantidadProductos)
        
        } else {

            let precioProducto = (cantidadProductos * (producto.item.precio/6)).toFixed(2)

            producto.item.cantidadProductos = cantidadProductos;
            producto.item.precioTotal = Number(precioProducto);

            setData({...data, 
                items: [...data.items, producto],
                cantidad: cantidadProductosTotal + cantidadProductos
            });

            setStock(stock - cantidadProductos)
        };
    }

    const deleteOnCart = producto => {

        const reducer = (acumulador, valor) => {return acumulador + valor.item.cantidadProductos};
        
        const posicionProducto = data.items.findIndex(item => item.id === producto.id);
        const cantidadProductosTotal = data.items.reduce(reducer, 0) - data.items[posicionProducto].item.cantidadProductos;
        const newProducts = data.items.filter(item => (item.id !== producto.id))

        setStock(() => {
            if(data.items[posicionProducto]){
                return (producto.item.stock - data.items[posicionProducto].item.cantidadProductos) + data.items[posicionProducto].item.cantidadProductos
            }
        })

        console.log(stock)
        
        setData({...data,
            items: newProducts,
            cantidad: cantidadProductosTotal
        })
    };

    const getProductosVendidos = () => {
        db.collection('ordenes').onSnapshot((docs) => {
            let arr = []
            docs.forEach((item) => {
                item.data().productos.forEach((producto) => {
                    arr.push(producto)
                })
            })
            setProductosVendidos(arr)
        })
    }

    useEffect(() => {
        getProductosVendidos()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const setearStock = (producto, productosVendidos) => {

        const posicionProducto = data.items.findIndex(item => item.id === producto.id);
        let productoActualVendido = productosVendidos ? productosVendidos.filter(item => item.id === producto.id) : null
        let cantidadProductosVendidos = productoActualVendido ? productoActualVendido.reduce((acumulador, producto) => {return acumulador + producto.item.cantidadProductos}, 0) : null
        
        if(data.items[posicionProducto]){
            if(data.items[posicionProducto].id) {
                setStock(producto.item.stock - data.items[posicionProducto].item.cantidadProductos - cantidadProductosVendidos);
            }
        } else {
            setStock(producto.item.stock - cantidadProductosVendidos)
        }
    };

    const limpiarCarrito = () => {
        setData({
            cantidad: 0,
            items: []
        })
    }

    const sumarMasProductos = producto => {
        if(producto.item.cantidadProductos !== producto.item.stock){

            const cantidadProductosTotal = data.items.reduce((acumulador, valor) => {return acumulador + valor.item.cantidadProductos}, 0);
            const posicionProducto = data.items.findIndex(item => item.id === producto.id);
            let precioProducto = Number(data.items[posicionProducto].item.precioTotal + (6 * (producto.item.precio/6))).toFixed(2);

            data.items[posicionProducto].item.cantidadProductos = data.items[posicionProducto].item.cantidadProductos + 6
            data.items[posicionProducto].item.precioTotal = Number(precioProducto);
            data.cantidad = cantidadProductosTotal + 6;

            setData({...data})
        } else {
            return
        }
    }

    const restarProductos = producto => {
        if(producto.item.cantidadProductos !== 6){

            const cantidadProductosTotal = data.items.reduce((acumulador, valor) => {return acumulador + valor.item.cantidadProductos}, 0);
            const posicionProducto = data.items.findIndex(item => item.id === producto.id);
            let precioProducto = Number(data.items[posicionProducto].item.precioTotal - (6 * (producto.item.precio/6))).toFixed(2);

            data.items[posicionProducto].item.cantidadProductos = data.items[posicionProducto].item.cantidadProductos - 6
            data.items[posicionProducto].item.precioTotal = Number(precioProducto);
            data.cantidad = cantidadProductosTotal - 6;

            setData({...data})
        } else {
            return
        }
    }

    return (
        <StoreContext.Provider 
        value={{
            data,
            stock,
            precioTotal,
            setData,
            setStock,
            setearStock,
            deleteOnCart,
            setPrecioTotal,
            limpiarCarrito,
            restarProductos,
            agregarAlCarrito,
            sumarMasProductos,
            productosVendidos,
        }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider;