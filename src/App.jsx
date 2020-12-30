import {BrowserRouter, Switch, Route} from 'react-router-dom';

import EnConstruccion from './components/Home/EnConstruccion';
import Nav from './components/Global/Navbar/Nav/Nav';
import CategoriesNav from './components/Products/Categories/CategoriesNav';
import Category from './components/Category/Category';
import ItemDetailContainer from './components/Products/ItemDetailContainer/ItemDetailContainer';

function App() {
      
    return (
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

                <Route path="/como-funciona">
                    <EnConstruccion />
                </Route>

                <Route path="/zonas-de-entrega">
                    <EnConstruccion />
                </Route>

            </Switch>
        </BrowserRouter>
    )
}

export default App;
