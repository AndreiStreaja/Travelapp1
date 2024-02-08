import React, { useState } from 'react';
import jsPDF from 'jspdf';



const TravelRegistration = React.forwardRef(({ destinationName }, ref) => {
    const [name, setname] = useState('');
    const [prename, setPrename] = useState('');
    const [flightClass, setflightClass] = useState('');
    const [luggagesKg, setluggagesKg] = useState('');
    const [dateAndTime_CheckIn, setdateAndTime_CheckIn] = useState('');
    const [tripService, settripService] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {


            const pdf = new jsPDF();
            pdf.text(`Name: ${name}`, 20, 20);
            pdf.text(`Prename: ${prename}`, 20, 30);
            pdf.text(`Clasa Zborului: ${flightClass}`, 20, 40);
            pdf.text(`Kg Bagaje: ${luggagesKg}`, 20, 50);
            pdf.text(`Data și Ora Îmbarcării: ${dateAndTime_CheckIn}`, 20, 60);
            pdf.text(`Călătorie în Scop de Serviciu: ${tripService ? 'Da' : 'Nu'}`, 20, 70);

            let result = await fetch('http://localhost:5000/save-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    prename,
                    flightClass,
                    luggagesKg,
                    dateAndTime_CheckIn,
                    tripService,
                }),
            });
            result = await result.json();
            if (result) {
                alert('Registration successful');
                setname('');
                setPrename('');
                setflightClass('');
                setluggagesKg('');
                setdateAndTime_CheckIn('');
                settripService('');
            }
            pdf.save(`${destinationName.toLowerCase()}-formular.pdf`);
        } catch (error) {
            console.error('Eroare la salvarea datelor.');
        }
    };

    return (
        <form ref={ref} onSubmit={handleSubmit}>
            <h3>Desire destination: {destinationName}</h3>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="prename" className="form-label">Prename:</label>
                <input
                    type="text"
                    className="form-control"
                    id="prename"
                    value={prename}
                    onChange={(e) => setPrename(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="flightClass" className="form-label">FlightClass:</label>
                <input
                    type="text"
                    className="form-control"
                    id="flightClass"
                    value={flightClass}
                    onChange={(e) => setflightClass(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="luggagesKg" className="form-label">LuggagesKg:</label>
                <input
                    type="text"
                    className="form-control"
                    id="luggagesKg"
                    value={luggagesKg}
                    onChange={(e) => setluggagesKg(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="dateAndTime_CheckIn" className="form-label">DateAndTime_CheckIn:</label>
                <input
                    type="text"
                    className="form-control"
                    id="dateAndTime_CheckIn"
                    value={dateAndTime_CheckIn}
                    onChange={(e) => setdateAndTime_CheckIn(e.target.value)}
                />
            </div>
            <div className="mb-3 form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="tripService"
                    checked={tripService}
                    onChange={() => settripService(!tripService)}
                />
                <label className="form-check-label" htmlFor="tripService">Trip Service</label>
            </div>
            <button type="submit" className="btn btn-primary">Send and save your boarding pass</button>
        </form>
    );
});

export default TravelRegistration;
