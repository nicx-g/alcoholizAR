import Logo from './resources/images/logo-icon.png';

function App() {
    return (
		<div style={{height: 100 + "vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "linear-gradient(45deg, #e66465, #9198e5)"}}>
			<h1 style={{textAlign: "center", color: "white", fontWeight: "900", fontSize: 2 + "rem"}}>Probablemente haga una página de alcohol. Será lo más ético? Quién sabe</h1>
			<img src={Logo} alt="Este va a ser temporalmente el logo de la pag" width="300" />

			<div>
				<h2 style={{textAlign: "center", color: "white", fontWeight: "900", fontSize: 2 + "rem"}}>Estoy intentando encontrar extensiones para escribir en jsx con la facilidad que tengo en html pero ta dificil. Será momento de escribir mis propias extensiones? </h2>
				<h2 style={{textAlign: "center", color: "white", fontWeight: "900", fontSize: 2 + "rem"}}>Todo esto es de prueba, por supuesto.</h2>
			</div>
			
		</div>
    );
}

export default App;
