import { useState, useEffect } from "react";
import { store } from "./firebaseconf";

function App() {
  const [idUsuario, setIdUsuario] = useState("");
  const [nombre, setNombre] = useState("");
  const [phone, setPhone] = useState("");
  const [usuarioAgenda, setUsuarioAgenda] = useState([]);
  const [error, setError] = useState("");
  const [modoedicion, setModoEdicion] = useState(null);

  useEffect(() => {
    const getUsuarios = async () => {
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuarioAgenda(nuevoArray);
    };
    getUsuarios();
  }, []);

  const setUsuarios = async (event) => {
    event.preventDefault();
    if (!nombre.trim()) {
      setError("El campo nombre esta vacio");
    } else if (!phone.trim()) {
      setError("El campo Telefono esta vacio");
    }

    const usuario = {
      nombre: nombre,
      phone: phone,
    };

    try {
      const data = await store.collection("agenda").add(usuario);
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuarioAgenda(nuevoArray);
      alert("Usuario añadida");
      // console.log("Tarea añadida");
    } catch (e) {
      console.log(e);
    }
    setNombre("");
    setPhone("");
  };

  const borrarUsuario = async (id) => {
    await store.collection("agenda").doc(id).delete();
    const { docs } = await store.collection("agenda").get();
    const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
    setUsuarioAgenda(nuevoArray);
    try {
    } catch (e) {
      console.log(e);
    }
  };

  const actualizarUsuario = async (id) => {
    try {
      const data = await store.collection("agenda").doc(id).get();
      const { nombre, phone } = data.data();
      setNombre(nombre);
      setPhone(phone);
      setIdUsuario(id);
      setModoEdicion(true);
      // console.log(id);
      // console.log(data.data());
    } catch (error) {
      console.log(error);
    }
  };

  const setUpdate = async (event) => {
    event.preventDefault();
    if (!nombre.trim()) {
      setError("El campo nombre esta vacio");
    } else if (!phone.trim()) {
      setError("El campo Telefono esta vacio");
    }

    const userUpdate = {
      nombre: nombre,
      phone: phone,
    };

    try {
      await store.collection("agenda").doc(idUsuario).set(userUpdate);
      const { docs } = await store.collection("agenda").get();
      const nuevoArray = docs.map((item) => ({ id: item.id, ...item.data() }));
      setUsuarioAgenda(nuevoArray);
    } catch (error) {
      console.log(error);
    }
      setNombre("");
      setPhone("");
      setIdUsuario("");
      setModoEdicion(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>
          <form
            onSubmit={modoedicion ? setUpdate : setUsuarios}
            className="form-group"
          >
            <input
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              placeholder="Introduce el nombre"
              type="text"
            />
            <input
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
              className="form-control mt-3"
              placeholder="Introduce el número"
              type="text"
            />
            {modoedicion ? (
              <input
                className="btn btn-outline-warning btn-lg mt-3"
                type="submit"
                value="EDITAR"
              />
            ) : (
              <input
                className="btn btn-outline-dark btn-lg mt-3"
                type="submit"
                value="REGISTRAR"
              />
            )}
          </form>
          {error ? (
            <div className="alert alert-danger mt-3">{error}</div>
          ) : null}
        </div>
        <div className="col">
          <h2>Lista de tu Agenda</h2>
          <ul className="list-group">
            {usuarioAgenda.length !== 0 ? (
              usuarioAgenda.map((item) => (
                <li className="list-group-item" key={item.id}>
                  {" "}
                  {item.nombre} --- {item.phone}{" "}
                  <button
                    onClick={(id) => {
                      borrarUsuario(item.id);
                    }}
                    className="btn btn-danger btn-sm float-end "
                  >
                    BORRAR
                  </button>
                  <button
                    onClick={(id) => {
                      actualizarUsuario(item.id);
                    }}
                    className="btn btn-info btn-sm float-end me-md-3"
                  >
                    ACTUALIZAR
                  </button>
                </li>
              ))
            ) : (
              <span> No hay usuarios que mostear </span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
