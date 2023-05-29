import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import DatosContext from '../Context/MyContext';
import './Formulario.css'
import camaraIcono from '../../imagenes/camara.png';

const paisesLatinoamericanos = [
  "Argentina",
  "Bolivia",
  "Brasil",
  "Chile",
  "Colombia",
  "Costa Rica",
  "Cuba",
  "Ecuador",
  "El Salvador",
  "Guatemala",
  "Haití",
  "Honduras",
  "Jamaica",
  "México",
  "Nicaragua",
  "Panamá",
  "Paraguay",
  "Perú",
  "Puerto Rico",
  "República Dominicana",
  "Uruguay",
  "Venezuela"
];

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [pais, setPais] = useState("");
  const [brindoPor, setBrindoPor] = useState("");
  const [formularioCompleto, setFormularioCompleto] = useState(false);
  const navigate = useNavigate();
  const { datosCompartidos, setDatosCompartidos } = useContext(DatosContext);

  const manejarCambioNombre = (e) => {
    setNombre(e.target.value);
    setFormularioCompleto(e.target.value && pais && brindoPor);
  };

  const manejarCambioPais = (e) => {
    setPais(e.target.value);
    setFormularioCompleto(nombre && e.target.value && brindoPor);
  };

  const manejarCambioBrindoPor = (e) => {
    setBrindoPor(e.target.value);
    setFormularioCompleto(nombre && pais && e.target.value);
  };

  // Maneja la activación de la cámara y redirige a la ruta correspondiente si el formulario está completo
  const manejarCamaraActivada = async () => {
    if (formularioCompleto) {
      setDatosCompartidos({
        ...datosCompartidos,
        nombre: nombre,
        pais: pais,
        brindopor: brindoPor
      });
      navigate("/Deteccion_objetos");
    } else {
      alert("Por favor completa el formulario antes de activar la cámara.");
    }
  };



  return (
    <form>
      <div className="formulario">
        <h1>Salute</h1>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input type="text" id="nombre" value={nombre} onChange={manejarCambioNombre} placeholder="luis" maxlength="10" />
        </div>
        <div>
          <label htmlFor="pais">País</label>
          <select id="pais" value={pais} onChange={manejarCambioPais}>
            <option id="paisPlaceholder" value="" disabled selected hidden>
              Argentina
            </option>
            {paisesLatinoamericanos.map((pais) => (
              <option key={pais} value={pais}>
                {pais}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="brindoPor">Brindo por/para</label>
          <textarea type="text" id="brindoPor" value={brindoPor} onChange={manejarCambioBrindoPor} placeholder="por los amigos" maxlength="80" />
        </div>
        <div className="botonCamara" >
          <button className="foto" type="button" onClick={manejarCamaraActivada}>
          <img className="imgCamaraUno" src={camaraIcono} alt="Camara" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Formulario;