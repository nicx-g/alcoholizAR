import './itemListContainer.scss';

const product = ({children}) => {
    return (
        <div className="itemListContainer">
            {children}
        </div>
    )
};

export default product;