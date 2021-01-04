import React from 'react';
import {useState} from 'react'
import {NavLink} from 'react-router-dom';

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
                        <NavLink to="/">
                            <img src="https://loremflickr.com/200/80" alt="Logo de la página"/>
                        </NavLink>
                        <ul>
                            <li><NavLink activeClassName="link-active" to="/productos">Ver productos</NavLink></li>
                            <li><NavLink activeClassName="link-active" to="/como-funciona">Cómo funciona</NavLink></li>
                            <li><NavLink activeClassName="link-active" to="/zonas-de-entrega">Zonas de entrega</NavLink></li>
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