import './itemList.scss'

const ItemList = (props) => {
    const selectPack = (e) => {
        if(e.target.classList.contains('active')){
            e.target.classList.remove('active');
        } else{
            e.target.classList.add('active');
        }
    }
    
    return (
        <div className="itemList">
            <div className="itemList__image">
                <img src="https://via.placeholder.com/150x150" alt="Cerveza Andes Origen Rubia lata 473ml"/>
            </div>
            <div className="itemList__title">
                <span className="itemList__title-title">Andes Origen</span>
                <span className="itemList__title-description">Cerveza Andes Origen Rubia Lata 473ml</span>
            </div>
            <div className="itemList__variants">
                <span className="itemList__variants-text">¿Cuántos packs?</span>
                <div className="itemList__variants__options">
                    <button className="itemList__variants__options-item"
                    onClick={selectPack}
                    >1</button>
                    <button className="itemList__variants__options-item"
                    onClick={selectPack}
                    >2</button>
                    <button className="itemList__variants__options-item"
                    onClick={selectPack}
                    >3</button>
                </div>
            </div>
            <div className="itemList__price">
                <span>Tu precio es: $650</span>
            </div>
            <div className="itemList__buy">
                <button>Agregar al carrito</button>
            </div>
        </div>
    )
}

export default ItemList;