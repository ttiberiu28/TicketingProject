import React, { useState } from 'react';
import RestClient from '../REST/RestClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MyLocation } from '../interfaces/MyLocation';
import splash from "./Images/homeimage.jpg";

export default function MyLocations() {
  const [locations, setLocations] = useState<MyLocation[]>([]);
  

  const handleDemo1 = () => {
    const promise = RestClient.getLocations()
    promise.then(data => setLocations(data));
  }

  function handleDemo2(id: number) {
    const promise = RestClient.getOneLocation(id)
    promise.then(data => console.log(`Location1: ${JSON.stringify(data)}`))
  }

  return (
    <div className="container">
      <h1>My Locations</h1>
      <div>Click a button to call a REST API</div>
      <button onClick={handleDemo1}>Get all locations</button>
      <button onClick={() => handleDemo2(1)}>Location1</button>
      <div className="row">
        {locations.map((location, index) => {
          return (
            <div key={index} className="col-2 mb-3">
              <img src={splash} alt="location" width="145" height="201" />
              <p className="text-center">{location.place}</p>
            </div>
          )
        })}
        {Array(22 - locations.length).fill(null).map((_, index) => {
          return (
            <div key={index + locations.length} className="col-2 mb-3">
              <img src={splash} alt="location" width="145" height="201"/>
            </div>
          )
        })}
      </div>
    </div>
  );
}
