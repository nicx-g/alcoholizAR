import {useState} from 'react'
import {Link} from 'react-router-dom';

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
                        <Link to="/productos">
                            <img src="/resources/images/logoNav.png" alt="Logo de la página, una birra con el nombre AlcoholizAR debajo"/>
                        </Link>
                    </div>
                    <div className="nav__actions">
                        <form className="nav__actions__search">
                            <input type="text"
                            placeholder="Buscar"/>
                            <button><i className="fas fa-search"></i></button>
                        </form>
                        <div className="nav__actions__login">
                            <Link to='/mi-orden'>Ver mi orden</Link>
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