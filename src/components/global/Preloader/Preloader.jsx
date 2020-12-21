import './preloader.scss';

const Preloader = ({texto}) => {
    return(
        <div className="preloader">
            <div className="preloader-item"></div>
            <div className="preloader__text">
                <p className="preloader__text-p">{texto}</p>
            </div>
        </div>
    )
}


export default Preloader;
