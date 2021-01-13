import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {useState} from 'react';

import EnConstruccion from './components/Home/EnConstruccion';
import Nav from './components/Global/Navbar/Nav/Nav';
import CategoriesNav from './components/Products/Categories/CategoriesNav';
import Category from './components/Category/Category';
import ItemDetailContainer from './components/Products/ItemDetailContainer/ItemDetailContainer';
import Footer from './components/Global/Footer/Footer';
import Cart from './components/Cart/Cart';
import {Store} from './store/index';

function App() {

    const [data, setData] = useState({
        items: [],
        cantidad: 0
    })
      
    return (
        <Store.Provider value={[data, setData]}>
            <BrowserRouter>
            
                <Nav />
                
                <Switch>
                    <Route exact path="/">
                        <EnConstruccion />
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
        </Store.Provider>
    )
}

export default App;
