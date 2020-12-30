import {BrowserRouter, Switch, Route} from 'react-router-dom';

import VerProductos from './components/VerProductos/VerProductos';
import EnConstruccion from './components/Home/EnConstruccion';
import Nav from './components/Global/Navbar/Nav/Nav';
import CategoriesNav from './components/Products/Categories/CategoriesNav';

function App() {
      
    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path="/">
                    <EnConstruccion />
                </Route>

                <Route path="/productos">
                    <CategoriesNav />
                    <VerProductos />
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
