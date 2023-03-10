import React from 'react';
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
      
    </React.Fragment>
  );
}