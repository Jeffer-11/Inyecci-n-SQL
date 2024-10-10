import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/Login.css';
import { urlApi } from "../services/apirest";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies();


class Login extends React.Component {
    //El estado (state) contiene un objeto form que almacena el usuario y la contrasena 
    //que el usuario ingresa en el formulario.
    state = {
        form: {
            usuario: "",
            contrasena: ""
        },
        error: false,
        errorMsg: ""
    }

    //Este método actualiza los valores del estado form cuando el usuario escribe en los campos de texto del formulario.
    //Utiliza la técnica de "spread operator" (...) para mantener el resto de los valores del formulario intactos
    // y solo cambiar el campo que está siendo editado.
    manejadorOnchange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    //Este método envía los datos del formulario (usuario y contrasena) a la API mediante una solicitud POST utilizando axios. 
    //Si la respuesta es exitosa (status "ok"), se guardan el usuario y la contraseña en las cookies, y luego se redirige al menú (/menu). 
    manejadorLogin = () => {
        let url = urlApi + "auth.php";
        axios.post(url, this.state.form)
            .then(response => {
                if (response.data.status === "ok") {
                    // Configura las cookies
                    cookies.set('usuario', this.state.form.usuario, { path: '/' });
                    cookies.set('contrasena', this.state.form.contrasena, { path: '/' });

                    // Redirige al menú
                    this.props.navigate('/menu');
                } else {
                    this.setState({
                        error: true,
                        errorMsg: response.data.result.error_msg
                    });
                }
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMsg: "Error de conexión"
                });
            });
    }

    //Este método se ejecuta automáticamente cuando el componente se ha montado. 
    //Si detecta que ya existen cookies de usuario y contrasena, redirige al usuario automáticamente al menú

    componentDidMount() {
        if (cookies.get('usuario') && cookies.get('contrasena')) {
            this.props.navigate('/menu');
        }
    }

    //Formulario 
    render() {
        return (
            <React.Fragment>
                <section className="vh-100">
                    <div className="App d-flex justify-content-center align-items-center vh-100">
                        <form className="form-container text-center">
                            <h2>CLÍNICA</h2>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Usuario</label>
                                <input type="text" className="form-control form-control-sm" id="exampleInputEmail1" name="usuario" placeholder="Ingrese su usuario" onChange={this.manejadorOnchange} />
                            </div>
                            <div className="mb-3" style={{ position: "relative" }}>
                                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                <input type="password" className="form-control form-control-sm" id="exampleInputPassword1" name="contrasena" placeholder="Contraseña" onChange={this.manejadorOnchange} />
                                <p className="recuperarClave">Olvidé mi contraseña <a href="#RecuperarClave">Recuperar</a></p>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={this.manejadorLogin}>Iniciar</button>
                            <div className="mt-3">
                                <p>o</p>
                                <p>Iniciar sesión con:</p>
                                <button type="button" className="btn btn-outline-primary mx-1"><i className="fab fa-facebook-f"></i> Facebook</button>
                                <button type="button" className="btn btn-outline-danger mx-1"><i className="fab fa-google"></i> Google</button>
                                <button type="button" className="btn btn-outline-secondary mx-1"><i className="fab fa-apple"></i> Apple</button>
                            </div>
                            <div className="mt-3">
                                <p>No tienes cuenta? <a href="#register" className="register-link">Regístrate</a></p>
                            </div>
                        </form>
                        {this.state.error &&
                            <div className="alert-box">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errorMsg}
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </React.Fragment>
        );
    }
}


//Es un envoltorio que utiliza el hook useNavigate de React Router para pasar la funcionalidad de navegación a la clase Login, 
//permitiendo redirigir a otras rutas desde dentro del componente.
function Navegacion(props) {
    let navigate = useNavigate();
    return <Login {...props} navigate={navigate} />;
}

export default Navegacion;

