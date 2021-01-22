import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import EnConstruccion from './components/Home/EnConstruccion';
import Nav from './components/Global/Navbar/Nav/Nav';
import CategoriesNav from './components/Products/Categories/CategoriesNav';
import Category from './components/Category/Category';
import ItemDetailContainer from './components/Products/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Global/Footer/Footer';
import Cart from './components/Cart/Cart';
import StoreProvider from './store/storeContext';

function App() {

    return (
        <StoreProvider>
            <BrowserRouter>
            
                <Nav />
                
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>

                    <Route exact path="/home">
                        <EnConstruccion />
                    </Route>

                    <Route path="/coder-reactjs-7130">
                        <Redirect to="/home"/>
                    </Route>

                    <Route path="/productos/:productos_cerveza?">
                        <CategoriesNav />
                        <Category />
                    </Route>

                    <Route path="/detail/:producto_id?">
                        <ItemDetailContainer />
                    </Route>

                    <Route path="/cart">
                        <Cart />
                    </Route>

                    <Route path="/como-funciona">
                        <EnConstruccion />
                    </Route>

                    <Route path="/zonas-de-entrega">
                        <EnConstruccion />
                    </Route>
                </Switch>
                
                <Footer />

            </BrowserRouter>
        </StoreProvider>
    )
}

export default App;
