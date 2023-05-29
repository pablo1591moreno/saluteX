import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Inicio from './components/Inicio/Inicio';
import Formulario from "./components/Formulario/Formulario"
import DeteccionObjetos from "./components/ConfirmarImagen/ConfirmarImagen"
import Buscando from './components/Buscando/Buscando';
import DatosContext from './components/Context/MyContext';


function App() {
  const [paginaActual, setPaginaActual] = useState('inicio');

  useEffect(() => {
    const timer = setTimeout(() => {
      setPaginaActual('formulario');
    }, 500);

    return () => clearTimeout(timer);
  }, []);

   // Define el estado y la función para compartir los datos
   const [datosCompartidos, setDatosCompartidos] = useState({
    nombre: '',
    pais: '',
    brindopor: '',
    datosImagen: null
  });

  return (
    <div className="App">
    <DatosContext.Provider value={{ datosCompartidos, setDatosCompartidos }}>
      <Router>
        <Routes>
          {paginaActual === 'inicio' && (
            <Route path="/" element={<Inicio />} />
          )}
          {paginaActual === 'formulario' && (
            <Route path="/" element={<Formulario />} />
          )}
          <Route path="/deteccion_objetos" element={<DeteccionObjetos/>} />
          <Route path="/Buscando" element={<Buscando/>} />
        </Routes>
      </Router>
      </DatosContext.Provider>
    </div>
  );
}

export default App;

