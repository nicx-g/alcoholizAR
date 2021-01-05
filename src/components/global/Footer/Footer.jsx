import {NavLink} from 'react-router-dom';
import Container from '../Container/Container';
import masterCardLogo from '../../../resources/images/mastercard-logo.png';
import visaLogo from '../../../resources/images/visa-logo.png';

const Footer = () => {
    return (
        <div className="footer">
            <Container>
                <div className="footer__wrapper">
                    <div className="footer__wrapper__webInformation">
                        <div className="footer__wrapper__webInformation__pagoYRedesSociales">
                            <div className="footer__wrapper__webInformation__pagoYRedesSociales__formasDePago">
                                <div className="footer__wrapper__webInformation__pagoYRedesSociales__formasDePago-title">
                                    <h3>Formas de pago</h3>
                                </div>
                                <div className="footer__wrapper__webInformation__pagoYRedesSociales__formasDePago-images">
                                    <img src={masterCardLogo} width="40px" alt="Aceptamos Mastercard en tus compras"/>
                                    <img src={visaLogo} width="40px" alt="Aceptamos Visa en tus compras"/>
                                </div>
                            </div>
                            <div className="footer__wrapper__webInformation__pagoYRedesSociales__redesSociales">
                                <div className="footer__wrapper__webInformation__pagoYRedesSociales__redesSociales-title">
                                    <h3>Redes sociales</h3>
                                </div>
                                <div className="footer__wrapper__webInformation__pagoYRedesSociales__redesSociales-icons">
                                    <a target="_blank" href="#"><i className="fab fa-facebook"></i></a>
                                    <a target="_blank" href="#"><i className="fab fa-instagram"></i></a>
                                    <a target="_blank" href="#"><i className="fab fa-twitter"></i></a>
                                    <a target="_blank" href="#"><i className="fab fa-linkedin"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="footer__wrapper__webInformation__menuBebidasYOtros">
                            <div className="footer__wrapper__webInformation__menuBebidasYOtros__bebidas">
                                <h3 className="footer__wrapper__webInformation__menuBebidasYOtros__bebidas-title">Productos</h3>
                                <nav className="footer__wrapper__webInformation__menuBebidasYOtros__bebidas__menu">
                                    <ul>
                                        <li>
                                            <NavLink to="/productos">Todas las bebidas</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/productos">Andes Origen</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/productos">Brahma</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/productos">Corona</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/productos">Patagonia</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/productos">Quilmes</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/productos">Stella Artois</NavLink>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <div className="footer__wrapper__autor">
                        <p>Esta página fue hecha con amor animado por <a target="_blank" href="https://www.linkedin.com/in/nicx-g/">nicx_g</a></p>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Footer;