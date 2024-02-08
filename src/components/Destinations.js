import 'bootstrap/dist/css/bootstrap.min.css'; // Importați Bootstrap
import paris from '../images/paris.jpg'
import roma from '../images/roma.jpg'
import praga from '../images/praga.jpg'
import barcelona from '../images/barcelona.jpg'
import santorini from '../images/santorini.jpg'
import React, { useState, useRef } from 'react';
import TravelRegistration from './TravelForms';





const TuristDestinationsEU = () => {
  const destinations = [
    { name: 'Paris', country: 'France', image: paris },
    { name: 'Rome', country: 'Italy', image: roma },
    { name: 'Barcelona', country: 'Spain', image: barcelona },
    { name: 'Praga', country: 'Czech Republic', image: praga },
    { name: 'Santorini', country: 'Greece', image: santorini },
  ];

  const [showForm, setshowForm] = useState(false);
  const [destinationNameSelected, setdestinationNameSelected] = useState('');
  const formularRef = useRef(null);

  const handleClick = (destinationName) => {
    setdestinationNameSelected(destinationName);
    setshowForm(true);
    formularRef.current && formularRef.current.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Tourist Destinations in Europe</h2>
      <div className="row">
        {destinations.map((destination, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <img
                src={destination.image}
                className="card-img-top"
                alt={destination.name}
              />
              <div className="card-body">
                <h5 className="card-title">{destination.name}</h5>
                <p className="card-text">{destination.country}</p>
                <button
                  className="btn btn-success formular-btn"
                  onClick={() => handleClick(destination.name)}
                >
                  Complete the Form
                </button>              </div>
            </div>
          </div>
        ))}
      </div>
      {showForm && <TravelRegistration destinationName={destinationNameSelected} ref={formularRef} />}
    </div>
  );
};

export default TuristDestinationsEU;
