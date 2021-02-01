import {Link} from 'react-router-dom';

const error404 = () => {
    return (
        <div className="error400">
            <div className="error400__vendor">
                <h1>Error 404. Página no encontrada</h1>
                <h2>Parece que estás en una sección equivocada :( te invitamos a volver al inicio</h2>
                <Link to='/home'>Volver al inicio</Link>
            </div>
        </div>
    )
}

export default error404;