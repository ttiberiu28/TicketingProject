import React from 'react';
import RestClient from './REST/RestClient';
import PanelA from './UI/PanelA';
import PanelB from './UI/PanelB';
import PanelC from './UI/PanelC';
import PanelD from './UI/PanelD';

const person = {
  fname: 'Kari',
  lname: 'Nordmann'
}

const employee = {
  name: 'Jane De',
  salary: 20_000,
  skills: ['Spring Boot', 'React', 'TypeScript']
}

export default function App() {
  return (
    <React.Fragment>
      <PanelA />
      <PanelB msg="Hello friend!" />

      <PanelC fname="Kari" lname="Nordmann" />
      <PanelC fname={person.fname} lname={person.lname} />
      <PanelC {...person}/> 
      {/* ... is the spread operator */}
      <PanelD {...employee} />
      
      <div>Click a button to call a REST API</div>
      <button onClick={() => demo1()}>Get all locations</button>
      
    </React.Fragment>
  );
}

function demo1() {
  const promise = RestClient.getLocations()
  promise.then(data => console.log(`All locations: ${JSON.stringify(data)}`))
}