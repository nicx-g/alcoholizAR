import React from 'react';
import {useState} from 'react'

import './nav.scss';
import '../../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import NavCart from '../NavCart/NavCart'
import Container from '../../Container/Container'
import CartWidget from '../CartWidget/CartWidget'

const Nav = () => {

    const [showCartWidget, setShowCartWidget] = useState(false)

    return (
        <>
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
                        <NavCart showHide={() => setShowCartWidget(!showCartWidget)} />
                    </div>
                </nav>
            </Container>
        </header>
        <CartWidget 
        showHide={showCartWidget} />
        </>
    )
}

export default Nav;