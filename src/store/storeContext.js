import {createContext, useState, useEffect} from 'react';
import {getFirestore} from '../firebase/index';

export const StoreContext = createContext();

const StoreProvider = ({children}) => {

    const [data, setData] = useState({
        items: [],
        cantidad: 0,
        precioTotal: 0,
    });
    const [stock, setStock] = useState(null);
    const [productosVendidos, setProductosVendidos] = useState(null);
    const db = getFirestore();

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
    
    const agregarAlCarrito = (producto, cantidadProductos) => {
        
        const reducer = (acumulador, valor) => {return acumulador + valor.item.cantidadProductos};
        const cantidadProductosTotal = data.items.reduce(reducer, 0);
        const posicionProducto = data.items.findIndex(item => item.id === producto.id);
        
        if(data.items.find(item => item.id === producto.id)){

            let precioProducto = Number(data.items[posicionProducto].item.precioTotal + (cantidadProductos * (producto.item.precio/6))).toFixed(2);
            
            data.items[posicionProducto].item.cantidadProductos = data.items[posicionProducto].item.cantidadProductos + cantidadProductos
            data.items[posicionProducto].item.precioTotal = Number(precioProducto);
            data.cantidad = cantidadProductosTotal + cantidadProductos
            data.precioTotal = Number(data.items.reduce((acumulador, valor) => {return acumulador + valor.item.precioTotal}, 0).toFixed(2))

            setData({...data})

            setStock(stock - cantidadProductos)
        
        } else {

            let precioProducto = (cantidadProductos * (producto.item.precio/6)).toFixed(2)
            let precioTotal = Number(data.items.reduce((acumulador, valor) => {return acumulador + valor.item.precioTotal}, 0).toFixed(2)) + Number(precioProducto)

            producto.item.cantidadProductos = cantidadProductos;
            producto.item.precioTotal = Number(precioProducto);

            setData({...data, 
                items: [...data.items, producto],
                cantidad: cantidadProductosTotal + cantidadProductos,
                precioTotal: Number(precioTotal)
            });

            setStock(stock - cantidadProductos)
        };
    }

    const deleteOnCart = producto => {

        const reducer = (acumulador, valor) => {return acumulador + valor.item.cantidadProductos};
        
        const posicionProducto = data.items.findIndex(item => item.id === producto.id);
        const cantidadProductosTotal = data.items.reduce(reducer, 0) - data.items[posicionProducto].item.cantidadProductos;
        const newProducts = data.items.filter(item => (item.id !== producto.id))
        let precioTotal = data.items.reduce((acumulador, valor) => {return acumulador + valor.item.precioTotal}, 0).toFixed(2) - (producto.item.precioTotal).toFixed(2)

        setData({...data,
            items: newProducts,
            cantidad: cantidadProductosTotal,
            precioTotal: Number(precioTotal.toFixed(2))
        })
    };

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
            items: [],
            precioTotal: 0
        })
    }

    const sumarMasProductos = (producto, productosVendidos) => {

        let productoActualVendido = productosVendidos ? productosVendidos.filter(item => item.id === producto.id) : null
        let cantidadProductosVendidos = productoActualVendido ? productoActualVendido.reduce((acumulador, producto) => {return acumulador + producto.item.cantidadProductos}, 0) : null
        
        if(producto.item.cantidadProductos !== (producto.item.stock - cantidadProductosVendidos)){
            
            const cantidadProductosTotal = data.items.reduce((acumulador, valor) => {return acumulador + valor.item.cantidadProductos}, 0);
            const posicionProducto = data.items.findIndex(item => item.id === producto.id);
            let precioProducto = Number(data.items[posicionProducto].item.precioTotal + (6 * (producto.item.precio/6))).toFixed(2);
            let precioTotal = (data.precioTotal + (6 * (producto.item.precio/6))).toFixed(2);

            data.items[posicionProducto].item.cantidadProductos = data.items[posicionProducto].item.cantidadProductos + 6
            data.items[posicionProducto].item.precioTotal = Number(precioProducto);
            data.cantidad = cantidadProductosTotal + 6;
            data.precioTotal = Number(precioTotal)

            setData({...data})
        } else {
            return
        }
    }

    const restarProductos = (producto) => {
        
        if(producto.item.cantidadProductos !== 6){

            const cantidadProductosTotal = data.items.reduce((acumulador, valor) => {return acumulador + valor.item.cantidadProductos}, 0);
            const posicionProducto = data.items.findIndex(item => item.id === producto.id);
            let precioProducto = Number(data.items[posicionProducto].item.precioTotal - (6 * (producto.item.precio/6))).toFixed(2);
            let precioTotal = (data.precioTotal - (6 * (producto.item.precio/6))).toFixed(2);

            data.items[posicionProducto].item.cantidadProductos = data.items[posicionProducto].item.cantidadProductos - 6
            data.items[posicionProducto].item.precioTotal = Number(precioProducto);
            data.cantidad = cantidadProductosTotal - 6;
            data.precioTotal = Number(precioTotal);

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
            setData,
            setStock,
            setearStock,
            deleteOnCart,
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