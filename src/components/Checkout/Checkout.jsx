import {useContext, useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import {StoreContext} from '../../store/storeContext';
import {getFirestore, getFirebase} from '../../firebase/index';

import Container from '../Global/Container/Container';
import Preloader from '../Global/Preloader/Preloader';

const Checkout = () => {
    const storeContext = useContext(StoreContext)
    const {data, setData} = storeContext

    const firebase = getFirebase();
    const db = getFirestore();

    const regexp = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        apellido: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
        dni: /^\d{8,8}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{7,14}$/,
        numeroTarjeta: /^([0-9]{4}[\s]){3}([0-9]{4}){1}$/,
        nombreTitular: /^([a-zA-Z]{2,40}\s){1,7}([a-zA-Z][^\d]{2,40}[^\s]){1}$/,
        codigoSeguridad: /^\d{3,4}$/,
    };

    const [camposValidados, setCamposValidados] = useState({
        nombre: false,
        apellido: false,
        email: false,
        dni: false,
        telefono: false,
        numeroTarjeta: false,
        nombreTitular: false,
        fechaExp: false,
        codigoSeguridad: false
    });

    const [utils, setUtils] = useState({
        errorDatosBasicos: null,
        datosBasicosTerminado: false,
        datosDomicilioTerminado: false,
        errorPago: null,
        pagoTerminado: false,
        loaderPago: false,
    });

    const [usuarioData, setUsuarioData] = useState({
        nombre: '',
        apellido: '',
        dni: '',
        email: '',
        telefono: '',
    });

    const [infoPago, setInfoPago] = useState({
        numeroTarjeta: "xxxx xxxx xxxx xxxx",
        nombreTitular: "Inserte nombre del titular",
        fechaExp: "MM/YY",
        codigoSeguridad: "000"
    });

    const orden = {
        dataUsuario: usuarioData,
        productos: data.items,
        montoTotal: data.precioTotal,
        fecha: firebase.firestore.Timestamp.fromDate(new Date()),
        estado: "pendiente"
    };

    const [ordenId, setOrdenId] = useState('');

    const [rotarCard, setRotarCard] = useState(false);
    
    const handleInput = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarInput(regexp.nombre, e, false);
                break;
                
            case "apellido":
                validarInput(regexp.apellido, e, false);
                break;
            case "dni":
                validarInput(regexp.dni, e, false);
                break;
            case "email":
                validarInput(regexp.email, e, false);
                break;
            case "telefono":
                validarInput(regexp.telefono, e, false);
                break;
            case "numeroTarjeta":
                validarNumeroTarjeta(e);
                validarInput(regexp.numeroTarjeta, e, true);
                break;
            case "nombreTitular":
                validarNombreTitular(e);
                validarInput(regexp.nombreTitular, e, true);
                break;
            case "fechaExp":
                validarFechaExp(e);
                break;
            case "codigoSeguridad":
                validarInput(regexp.codigoSeguridad, e, true);
                break;
            default:
                return;
        }
    };

    const validarInput = (regexp, e, esPago) => {
        if(regexp.test(e.target.value)){
            setCamposValidados({
                ...camposValidados,
                [e.target.name]: true
            })

            if(esPago) {
                setInfoPago({
                    ...infoPago,
                    [e.target.name]: e.target.value
                })
            } else{
                setUsuarioData({
                    ...usuarioData,
                    [e.target.name]: e.target.value
                })
            }
            
        } else {
            setCamposValidados({
                ...camposValidados,
                [e.target.name]: false
            })
        }
    };

    const validarNumeroTarjeta = (e) => {
        let numeroTarjetaSinModificar = e.target.value;
        e.target.value = numeroTarjetaSinModificar
        .replace(/\s/g, '')
        .replace(/([0-9]{4})/g, '$1 ')
        .trim()
    };

    const validarNombreTitular = (e) => {
        let nombreTitularSinModif = e.target.value
        e.target.value = nombreTitularSinModif.toUpperCase();
    };

    const validarFechaExp = e => {
        let hoy = new Date();
        let mes = hoy.getMonth() + 1;
        let year = hoy.getFullYear().toString().slice(2);
        let valueArray = e.target.value.split('/');

        if(parseInt(valueArray[1]) === parseInt(year) && parseInt(valueArray[0]) > parseInt(mes) && parseInt(valueArray[0]) <= 12){
            setCamposValidados({
                ...camposValidados,
                [e.target.name]: true
            })
            setInfoPago({
                ...infoPago,
                [e.target.name]: e.target.value
            })
        } else if(parseInt(valueArray[1]) > parseInt(year) && parseInt(valueArray[1]) <= 99 && parseInt(valueArray[0]) >= 1 && parseInt(valueArray[0]) <= 12){
            setCamposValidados({
                ...camposValidados,
                [e.target.name]: true
            })
            setInfoPago({
                ...infoPago,
                [e.target.name]: e.target.value
            })
        } else{
            setCamposValidados({
                ...camposValidados,
                [e.target.name]: false
            })
        }

    };

    const handleSubmitForm1 = (e) => {
        e.preventDefault();
        if((camposValidados.nombre && camposValidados.apellido && camposValidados.telefono && camposValidados.email && camposValidados.dni)){
            setUtils({
                ...utils,
                errorDatosBasicos: false,
                datosBasicosTerminado: true
            })
            
        } else{
            setUtils({
                ...utils,
                errorDatosBasicos: true,
                datosBasicosTerminado: false
            })
        }
    };

    const handleSubmitForm2 = e => {
        e.preventDefault();
        if((camposValidados.nombreTitular && camposValidados.numeroTarjeta && camposValidados.fechaExp && camposValidados.codigoSeguridad)){
            setUtils({
                ...utils,
                errorPago: false,
                loaderPago: true,
            })

            setTimeout(() => {
                setUtils({
                    ...utils,
                    pagoTerminado: true,
                    loaderPago: false,
                })

                db.collection('ordenes').add(orden)
                .then(({id}) => setOrdenId(id))
                .catch(error => {
                    alert('algo salió mal :(');
                    console.log(error);
                })

                setData({
                    cantidad: 0,
                    items: []
                })
            }, 2000)
        } else{
            setUtils({
                ...utils,
                errorPago: true,
                pagoTerminado: false
            })
        }
    };

    useEffect(() => {
        document.title='Checkout | AlcoholizAR';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {data.items.length >= 1 || utils.pagoTerminado === true?

            <Container>
                <div className="checkout">
                    <div className={`checkout__datosBasicosUsuario ${utils.datosBasicosTerminado ? "adios" : "hola"}`}>
                        <form onSubmit={handleSubmitForm1} className="checkout__datosBasicosUsuario__form" method="POST">
                            <label htmlFor="nombre">Nombre</label>
                            <input 
                            className={camposValidados.nombre ? "exito" : 'error'} 
                            onKeyUp={handleInput} 
                            onBlur={handleInput} 
                            required 
                            type="text" 
                            name="nombre" 
                            id="nombre"/>
                            <label htmlFor="apellido">Apellido</label>
                            <input 
                            className={camposValidados.apellido ? "exito" : 'error'} 
                            onKeyUp={handleInput} 
                            onBlur={handleInput} 
                            required 
                            type="text" 
                            name="apellido" 
                            id="apellido"/>
                            <label htmlFor="dni">DNI</label>
                            <input 
                            className={camposValidados.dni ? "exito" : 'error'} 
                            onKeyUp={handleInput} 
                            onBlur={handleInput} 
                            required 
                            type="text" 
                            name="dni" 
                            id="dni"/>
                            <label htmlFor="email">Email</label>
                            <input 
                            className={camposValidados.email ? "exito" : 'error'} 
                            onKeyUp={handleInput} 
                            onBlur={handleInput} 
                            required 
                            type="email" 
                            name="email" 
                            id="email"/>
                            <label htmlFor="telefono">Teléfono</label>
                            <input 
                            className={camposValidados.telefono ? "exito" : 'error'} 
                            onKeyUp={handleInput} 
                            onBlur={handleInput} 
                            required 
                            type="text" 
                            name="telefono" 
                            id="telefono"/>
                            <button>Siguiente</button>
                            {utils.errorDatosBasicos ? 
                            <p>Tenés que completar correctamente el formulario!</p> :
                                null
                            }
                        </form>
                    </div>
                    <div className={`checkout__pagoDireccionUsuario ${utils.datosBasicosTerminado ? "hola" : "hidden"} ${utils.pagoTerminado ? "hidden" : null}`}>
                        <form onSubmit={handleSubmitForm2} className="checkout__pagoDireccionUsuario__form" method="POST">
                            <div className="checkout__pagoDireccionUsuario__form__tarjeta">
                                <div className="checkout__pagoDireccionUsuario__form__tarjeta__campos">
                                    <label htmlFor="numeroTarjeta">Número de tarjeta</label>
                                    <input 
                                    className={camposValidados.numeroTarjeta ? "exito" : 'error'} 
                                    type="text"
                                    onBlur={handleInput}
                                    onKeyUp={handleInput}
                                    name="numeroTarjeta" 
                                    id="numeroTarjeta"/>
                                    <label htmlFor="nombreTitular">Nombre del titular que aparece en la tarjeta</label>
                                    <input 
                                    className={camposValidados.nombreTitular ? "exito" : 'error'} 
                                    type="text"
                                    onBlur={handleInput}
                                    onKeyUp={handleInput}
                                    name="nombreTitular" 
                                    id="nombreTitular"/>
                                    <div>
                                        <div>
                                            <label htmlFor="fechaExp">Fecha de expiración</label>
                                            <input 
                                            className={camposValidados.fechaExp ? "exito" : 'error'} 
                                            type="text"
                                            onBlur={handleInput}
                                            onKeyUp={handleInput}
                                            name="fechaExp" 
                                            id="fechaExp"/>
                                        </div>
                                        <div>
                                            <label htmlFor="codigoSeguridad">Código de seguridad</label>
                                            <input 
                                            className={camposValidados.codigoSeguridad ? "exito" : 'error'} 
                                            onKeyUp={handleInput}
                                            onFocus={() => setRotarCard(true)}
                                            onBlur={(e) => {
                                                setRotarCard(false)
                                                handleInput(e)
                                            }}
                                            type="text" 
                                            name="codigoSeguridad" 
                                            id="codigoSeguridad"/>
                                        </div>
                                    </div>
                                    <button>Confirmar compra</button>
                                </div>
                                <div className="checkout__pagoDireccionUsuario__form__tarjeta__imagen">
                                    <div className={`checkout__pagoDireccionUsuario__form__tarjeta__imagen__frente cara ${rotarCard ? 'rotado' : null}`}>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__frente-numeroTarjeta">{infoPago.numeroTarjeta}</p>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__frente-banco">Banco</p>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__frente-vencimiento">{infoPago.fechaExp}</p>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__frente-tipo">Visa/Mastercard</p>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__frente-chip"></p>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__frente-titular">{infoPago.nombreTitular}</p>
                                    </div>
                                    <div className={`checkout__pagoDireccionUsuario__form__tarjeta__imagen__reverso cara ${rotarCard ? 'rotado' : null}`}>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__reverso-banda"></p>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__reverso-firma"></p>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__reverso-textoFirma">Firma autorizada</p>
                                        <span className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__reverso-codigo">{infoPago.codigoSeguridad}</span>
                                        <p className="checkout__pagoDireccionUsuario__form__tarjeta__imagen__reverso-textoRelleno">Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam debitis, aperiam libero eaque ipsam aspernatur sed officia autem quod deleniti veritatis vero, illum harum esse repellendus minima porro, animi pariatur possimus voluptatem! Ipsum vitae deserunt illum eius enim incidunt! Ea.</p>
                                    </div>
                                </div>
                            </div>
                        {utils.errorPago ? 
                        <p className="checkout__pagoDireccionUsuario__form__error">Tenés que completar correctamente el formulario!</p> :
                            null
                        }
                        </form>
                    </div>
                    <div className={`checkout__compraFinalizada ${utils.pagoTerminado ? null : "hidden"}`}>
                        <p className="checkout__compraFinalizada-textoPrincipal">¡Muchas gracias por tu compra! te mandaremos por email los detalles del mismo y te dejamos a continuación tu número de pedido.</p>
                        <p className="checkout__compraFinalizada-orden">Número de pedido: {ordenId}</p>
                        <Link to='/'>¡Quiero seguir comprando!</Link>
                    </div>
                </div>
                <div className={`cargandoPago ${utils.loaderPago ? 'show' : null}`}>
                    <Preloader texto="Comprobando pago"/>
                </div>

            </Container> :

            <div className="checkout__noItems">
                <div className="checkout__noItems__vendor">
                    <h3>Parece que todavía no compraste nada :( acá tenés un link directo para conocer todos nuestros productos</h3>
                    <Link to='/'>Ver todos los productos</Link>
                </div>
            </div>
        }
        </>
    )
}

export default Checkout;