import React from 'react';
import './css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Menu from './components/Menu';

class App extends React.Component {
 

  notificacion = (mensaje, campo) => {
    const contenedor = document.querySelector(`.${campo}-notificacion`);
    if (contenedor) {
      const parrafo = document.createElement('P');
      parrafo.textContent = mensaje;
      parrafo.classList.add('alert');
      parrafo.classList.add('alert-danger');
      contenedor.innerHTML = '';
      contenedor.appendChild(parrafo);
      setTimeout(() => {
        parrafo.remove();
      }, 3500);
    }
  }
 

  render() {
    return (
      <React.Fragment>
        <Router>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/menu' element={<Menu />} />
          </Routes>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
