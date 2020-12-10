
import Nav from './components/global/nav/Nav';
import Container from './components/global/container/Container';
import ItemListContainer from './components/products/ItemListContainer';
import ItemList from './components/products/ItemList';

function App() {
      
    return (
        <>
        <Nav/>
        <div className="productos">
            <Container>
                <ItemListContainer>
                    <ItemList/>
                    <ItemList/>
                    <ItemList/>
                    <ItemList/>
                    <ItemList/>
                    <ItemList/>
                    <ItemList/>
                    <ItemList/>
                </ItemListContainer>
            </Container>
        </div>
        </>
    )
}

export default App;
