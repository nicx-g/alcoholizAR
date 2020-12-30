import './categoriesNav.scss';

import Container from '../../Global/Container/Container';
import {NavLink} from 'react-router-dom';

const CategoriesNav = () => {

    const menuCategories = [
        {
            cerveza: "Andes Origen",
            ruta: "/productos/andes-origen"
        },

        {
            cerveza: "Brahma",
            ruta: "/productos/brahma"
        },
        
        {
            cerveza: "Corona",
            ruta: "/productos/corona"
        },

        {
            cerveza: "Patagonia",
            ruta: "/productos/patagonia"
        },

        {
            cerveza: "Quilmes",
            ruta: "/productos/quilmes"
        },

        {
            cerveza: "Stella Artois",
            ruta: "/productos/stella-artois"
        }
    ]
    
    return (
        <nav className="categories">
            <Container>
                <ul>
                    {
                        menuCategories.map((item, index) => {
                            return(
                            <li key={index} className="categories__item">
                                <NavLink activeClassName="link-active" to={item.ruta}>{item.cerveza}</NavLink>
                            </li>
                            )
                        })
                    }
                </ul>
            </Container>
        </nav>
    )
}

export default CategoriesNav;