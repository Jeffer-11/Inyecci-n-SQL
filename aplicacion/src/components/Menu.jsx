import React from "react";
import '../css/menu.css';
import { useNavigate } from "react-router-dom";
import pacientesImg from '../img/multitud.png';
import doctoresImg from '../img/medicos.png';
import consultasImg from '../img/discusion.png';
import visitasImg from '../img/visitantes.png';
import camasImg from '../img/medico.png';
import departamentosImg from '../img/departamento.png';
import enfermera from '../img/enfermeras.png';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends React.Component {

    cerrarSesion = () => {
        cookies.remove('usuario', { path: '/' });
        cookies.remove('contrasena', { path: '/' });
        window.location.href = './';
    }

    componentDidMount() {
        if (!cookies.get('usuario') || !cookies.get('contrasena')) {
            window.location.href = "./";
        }
    }

    render() {
        const { navigate } = this.props;

        const handleNavigation = (path) => {
            navigate(path);
        };

        return (
            <div>
                <div className="menu">
                    <button className="btn btn cerrar-sesion" type="button" onClick={this.cerrarSesion}>
                        <i className="fas fa-sign-out-alt"></i> Cerrar la sesión
                    </button>
                    <h1 className="text-center fw-bold">Menú</h1>
                    <div className="navbar">
                        <button className="nav-button blue" onClick={() => handleNavigation('/datospacientes')}>
                            <img src={pacientesImg} alt="Pacientes" className="icon" />
                            <span className="label">Pacientes</span>
                        </button>
                        <button className="nav-button red" onClick={() => handleNavigation('/datosdoctores')}>
                            <img src={doctoresImg} alt="Doctores" className="icon" />
                            <span className="label">Doctores</span>
                        </button>
                        <button className="nav-button green" onClick={() => handleNavigation('/datosconsultas')}>
                            <img src={consultasImg} alt="Consultas" className="icon" />
                            <span className="label">Consultas</span>
                        </button>
                        <button className="nav-button orange" onClick={() => handleNavigation('/datosvisitas')}>
                            <img src={visitasImg} alt="Visitas" className="icon" />
                            <span className="label">Visitas</span>
                        </button>
                        <button className="nav-button grey" onClick={() => handleNavigation('/datoscamas')}>
                            <img src={camasImg} alt="Camas" className="icon" />
                            <span className="label">Camas</span>
                        </button>
                        <button className="nav-button pink" onClick={() => handleNavigation('/datosdepartamento')}>
                            <img src={departamentosImg} alt="Departamentos" className="icon" />
                            <span className="label">Departamentos</span>
                        </button>
                        <button className="nav-button ponk" onClick={() => handleNavigation('/DatosEnfermera')}>
                            <img src={enfermera} alt="Enfermera" className="icon" />
                            <span className="label">Enfermeras</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function Navegacion(props) {
    let navigate = useNavigate();
    return <Menu {...props} navigate={navigate} />;
}

export default Navegacion;
