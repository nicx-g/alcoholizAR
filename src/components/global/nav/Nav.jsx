import React from 'react';

import './nav.scss';
import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import CartWidget from '../cartWidget/CartWidget'
import Container from '../container/Container'

const nav = () => {
    return (
        <header>
            <Container>
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
                        <CartWidget />
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default nav;