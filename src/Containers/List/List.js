import React, { Fragment } from "react";
import Card from "../../Components/Card/Card";
// Para agregar: &s=joker a http://www.omdbapi.com/?i=tt3896198&apikey=b39dede6

// console.log(process.env.API);
// const API = process.env.API;
const API = "http://www.omdbapi.com/?i=tt3896198&apikey=b39dede6";

class List extends React.Component {
  constructor() {
    // funcionalidades
    super();
    // Acceso a los estados, que primero no estan porque estan en otro archivo
    this.state = {
      data: [],
      searchTerm: "",
      error: "",
      loading: true,
    };
  }
  // Se ejecuta apenas carga el programa y pide datos
  async componentDidMount() {
    // asincronico y mientras ejecutas otra cosa
    // const res = await fetch("../../assets/data.json");
    const res = await fetch(`${API}&s=batman`);
    const resJSON = await res.json();

    // Acá le doy los datos
    this.setState({ data: resJSON.Search, loading: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    // Si al enviar esta vacio retorna un mensaje
    if (!this.state.searchTerm) {
      return this.setState({ error: "Please write a valid text" });
    }
    // Busca el termino
    const res = await fetch(`${API}&s={this.state.searchTerm}`);
    const data = await res.json();

    if (!data.Search) {
      return this.setState({ error: "The are no results" });
    }

    // Asigno datos encontrados, si estaba el mje lo elimina y la busqueda tmb
    this.setState({ data: data.Search, error: "", searchTerm: "" });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <h3 className="text-light">Loading</h3>;
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-4 offset-md-4 p-4">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                value={this.state.searchTerm}
                autoFocus
              />
            </form>
            {/* Si existe el error lo muestra  */}
            <p className="text-white">
              {this.state.error ? this.state.error : ""}
            </p>
          </div>
        </div>

        <div className="row">
          {
            // retorna y recorre desde el estado, data, el arreglo
            data.map((movie, i) => {
              return <Card movie={movie} key={i} />;
            })
          }
        </div>
      </Fragment>
    );
  }
}

export default List;
