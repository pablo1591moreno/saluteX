import React, { useEffect, useState } from 'react';
import './inicio.css';

const Inicio = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Puedes ajustar el tiempo de espera según tus preferencias
  }, []);

  return (
    <div className={`salute ${isVisible ? 'visible' : ''}`}>
      <h1>Salute</h1>
    </div>
  );
};

export default Inicio;
