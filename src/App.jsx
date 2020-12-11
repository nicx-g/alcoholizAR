
import Nav from './components/Global/Nav/Nav';
import Container from './components/Global/Container/Container';
import ItemListContainer from './components/Products/ItemListContainer';
import ItemList from './components/Products/ItemList';

function App() {
      
    return (
        <>
        <Nav/>
        <div className="productos">
            <Container>
                <ItemListContainer>
                    <ItemList titulo="Andes Origen" descripcion="Cerveza Andes Origen Rubia Lata 473ml" stock="120" precio="490"/>
                    <ItemList titulo="Andes Origen" descripcion="Cerveza Andes Origen IPA Lata 473ml" stock="60" precio="440"/>
                    <ItemList titulo="Andes Origen" descripcion="Cerveza Andes Origen Roja Lata 473ml" stock="180" precio="430"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                    <ItemList titulo="Stella Artois" descripcion="Cerveza Stella Artois Lata 473ml" stock="30" precio="510"/>
                </ItemListContainer>
            </Container>
        </div>
        </>
    )
}

export default App;
