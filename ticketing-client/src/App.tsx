import React from 'react';
import RestClient from './REST/RestClient';

export default function App() {
  
  return (
    <React.Fragment>
       
      <div>Click a button to call a REST API</div>
      <button onClick={() => demo1()}>Get all locations</button>
      <button onClick={() => demo2(1)}>Location1</button>
    </React.Fragment>
  );
}

function demo1() {
  const promise = RestClient.getLocations()
  promise.then(data => console.log(`All locations: ${JSON.stringify(data)}`))
}

function demo2(id : number) {
  const promise = RestClient.getOneLocation(id)
  promise.then(data => console.log(`Location1: ${JSON.stringify(data)}`))
}