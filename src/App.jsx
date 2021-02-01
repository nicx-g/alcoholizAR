import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import Nav from './components/Global/Navbar/Nav/Nav';
import CategoriesNav from './components/Products/Categories/CategoriesNav';
import Category from './components/Category/Category';
import ItemDetailContainer from './components/Products/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Global/Footer/Footer';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import StoreProvider from './store/storeContext';
import Ordenes from './components/Ordenes/Ordenes';
import Error404 from './components/404/404';

function App() {

    return (
        <StoreProvider>
            <BrowserRouter>
            
                <Nav />
                <CategoriesNav />
                
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/productos"/>
                    </Route>

                    <Route path="/coder-reactjs-7130">
                        <Redirect to="/productos"/>
                    </Route>

                    <Route path="/home">
                        <Redirect to="/productos"/>
                    </Route>

                    <Route path="/inicio">
                        <Redirect to="/productos"/>
                    </Route>

                    <Route path="/productos/:productos_cerveza?">
                        <Category />
                    </Route>

                    <Route path="/:productos_cerveza/:producto_id">
                        <ItemDetailContainer />
                    </Route>

                    <Route path="/cart">
                        <Cart />
                    </Route>

                    <Route path="/checkout">
                        <Checkout />
                    </Route>

                    <Route path="/mi-orden">
                        <Ordenes />
                    </Route>

                    <Route path="*">
                        <Error404 />
                    </Route>
                </Switch>
                
                <Footer />

            </BrowserRouter>
        </StoreProvider>
    )
}

export default App;
