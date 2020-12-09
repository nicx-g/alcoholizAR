import React from 'react';

import './nav.scss';
import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'

const nav = () => {
    return <header>
                <div className="container">
                    <nav className="nav">
                        <div className="nav__menu">
                            <a href="#/inicio">
                                <img src="https://via.placeholder.com/200x80" alt="Logo de la página"/>
                            </a>
                            <ul>
                                <li><a href="#/productos">Ver productos</a></li>
                                <li><a href="#/comofunciona">Cómo funciona</a></li>
                                <li><a href="#/zonasdeentrega">Zonas de entrega</a></li>
                            </ul>
                        </div>
                        <div className="nav__actions">
                            <form className="nav__actions__search">
                                <input type="text"
                                placeholder="Buscar"/>
                                <button><i className="fas fa-search"></i></button>
                            </form>
                            <div className="nav__actions__login">
                                <button>Ingresar</button>
                            </div>
                            <div className="nav__actions__cart">
                                <button><i className="fas fa-shopping-cart"><span>0</span></i></button>
                            </div>
                        </div>
                    </nav>
            </div>
        </header>
}

export default nav;