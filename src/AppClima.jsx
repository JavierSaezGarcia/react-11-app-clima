import React, { useState } from 'react';
import axios from 'axios';

export const AppClima = () => {
  const [ciudad, setCiudad] = useState('');
  const [datosClima, setDatosClima] = useState(null);

  const API_KEY = '14a3f5c0611645a4a30a44672f496da4'; // Reemplaza con tu API Key 
  const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather';
  const URL_ICON_BASE = 'https://openweathermap.org/img/wn/';

  const buscarDatosClima = async () => {
    try {
      // Con axios, es la forma mas sencilla y solo necesitamos un await:
      const response = await axios.get(`${URL_BASE}?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);
      setDatosClima(response.data);

      // Con fetch() de javascript:
      // const response = await fetch(`${URL_BASE}?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`);  
      // importante el await siguiente
      // setDatosClima(await response.json()); 
      
    } catch (error) {
      console.error('Error busqueda de datos del tiempo:', error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    buscarDatosClima();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 mt-5 offset-md-4 align-items-center">
          <h1 className="text-center">App Clima</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Escribe el nombre de la ciudad"
                aria-describedby="button-addon2"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />
              <button className="btn btn-primary btn-sm" type="button" id="button-addon2" onClick={buscarDatosClima}>Tiempo</button>
            </div>
            {
            // Si hay datos de clima, mostramos los datos si no, no se muestra nada
            datosClima && (
              <div className="card">
                <div className="card-body">
                  <h2 className="card-title text-center">Tiempo en: {datosClima.name}</h2>
                  <hr />
                  <h5 className="card-subtitle text-center">Datos meteorología</h5>
                  <div className="card-body text-bg-primary mt-3 text-center" style={{ borderRadius: '5px' }}>
                    <p className="card-text"><b>Temperatura: </b>{datosClima.main.temp}°C</p>
                    <p className="card-text"><b>Sensación térmica: </b>{datosClima.main.feels_like}°C</p>
                    <p className="card-text"><b>Viento: </b>{Math.round((datosClima.wind.speed / 1000) * 3600)} Km/h</p>
                    <p className="card-text"><b>Humedad: </b> {datosClima.main.humidity}%</p>
                    <p className="card-text"><b>Tiempo: </b> {(datosClima.weather[0].description).toUpperCase()}</p>
                    <img style={{ 'width': '10em', 'marginTop':'-30px' }} src={`${URL_ICON_BASE}${datosClima.weather[0].icon}@2x.png`} />
                  </div>
                </div>
              </div>
            )
            }
          </form>
        </div>
      </div>
    </div>
  )
}
