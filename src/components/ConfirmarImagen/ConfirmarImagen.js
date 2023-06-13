import React, { useState, useEffect, useRef, useContext } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { useNavigate } from 'react-router-dom';
import DatosContext from '../Context/MyContext';
import './ConfirmarImagen.css'
import camaraIcono from '../../imagenes/camara.png';
import rotarIcono from '../../imagenes/cameraRotate.png';

function DeteccionObjetos() {
  const [modoCamara, setModoCamara] = useState('usuario')
  const [modelo, setModelo] = useState(null);
  const [imagenCargada, setImagenCargada] = useState(false);
  const [predicciones, setPredicciones] = useState([]);
  const [datosImagen, setDatosImagen] = useState(null);


  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { datosCompartidos, setDatosCompartidos } = useContext(DatosContext);

  // Carga el modelo pre-entrenado de detección de objetos COCO-SSD
  useEffect(() => {
    async function cargarModelo() {
      const modelo = await cocoSsd.load();
      setModelo(modelo);
    }
    cargarModelo();
  }, []);

  // Detecta los objetos en la imagen cargada utilizando el modelo cargado de COCO-SSD
  useEffect(() => {
    async function detectarObjetos() {
      if (imagenCargada && modelo && datosImagen) {
        const tensor = tf.browser.fromPixels(datosImagen);
        const predicciones = await modelo.detect(tensor);
        setPredicciones(predicciones);
      }
    }
    detectarObjetos();
  }, [imagenCargada, modelo, datosImagen], );

  // Activamos la camara
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: modoCamara } })
      .then(stream => {
        videoRef.current.srcObject = stream
        videoRef.current.play()

      }).catch((error => console.error(error)))
  }, [modoCamara]);

  // Toma una foto de la imagen capturada por la cámara y la guarda como un objeto Image
  const tomarFoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      const imagen = new Image();
      imagen.src = canvas.toDataURL();
      setDatosImagen(imagen);
      setImagenCargada(true);
      video.pause();
    }
  };


  // Reiniciamos la camara / Rotar camara
  const volverATomarFoto = () => {
    setModoCamara(modoCamara === 'usuario' ? 'environmet' : 'usuario')
    setImagenCargada(false);
  }

  const volver = () => {
    setModoCamara(modoCamara === 'usuario' ? 'environmet' : 'usuario');
    setImagenCargada(false);
    setPredicciones([])
  };

  const enviarImagen = () => {
    setDatosCompartidos({
      ...datosCompartidos,
      datosImagen: datosImagen
    });
    // Navega al siguiente componente (por ejemplo, Conectado)
    navigate('/Buscando');
  };

  const mensaje = predicciones.some(prediction => ['cup', 'wine glass', 'bottle'].includes(prediction.class))
    ?
    <>
    <div className='continuarOTomar'>
    <button onClick={volver}>Tomar otra</button>
      <button onClick={enviarImagen} >Continuar</button>
      </div>
    </>
    : imagenCargada ? (
      <>
        <div className='deNuevo' >
          <button className='tomarDeNuevo' onClick={volverATomarFoto}>Tomar de nuevo</button>
          <div className='texto' >
            <p className='sinBebida' >Sin bebida no hay salute</p>
            <p className='noDetect' >No detectamos ningun trago o bebida</p>
          </div>
        </div>
      </>
    ) : (
      <>
        <button className='camara' onClick={tomarFoto}>
          <img src={camaraIcono} alt="Camara" />
        </button>
        <button className='rotar' onClick={volverATomarFoto}>
          <img src={rotarIcono} alt="rotar" />
        </button>
      </>
    );


  return (
    <div className='contenedor'>
      <div class="videoContenedor">
        {imagenCargada ? (
          <img className='ImagenTomada' src={datosImagen.src} alt="Imagen tomada" />
        ) : (
          <video ref={videoRef} autoPlay></video>
        )}
     
          {mensaje}
       
      </div>
    </div>
  );
}

export default DeteccionObjetos;
