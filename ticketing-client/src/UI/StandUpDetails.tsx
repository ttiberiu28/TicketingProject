import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getStandUpEvents } from '../api/api';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { StandUp } from '../interfaces/StandUp'; // import the StandUp interface

const StandUpDetails: React.FC = () => {
  const { id = '0' } = useParams<{ id?: string }>(); // get the ID of the stand-up event from the URL
  const [standUp, setStandUp] = useState<StandUp | null>(null); // create a state variable to hold the stand-up event data

  useEffect(() => {
    getStandUpEvents(parseInt(id)).then((data) => setStandUp(data[0])); // fetch the stand-up event data when the component mounts and set the state variable
  }, [id]); // re-fetch the stand-up event data whenever the ID in the URL changes

  if (!standUp) {
    return <div>Loading...</div>; // show a loading message until the stand-up event data is fetched
  }

  // show the stand-up event details once the data is fetched
  return (
    <div>
      <h1>{standUp.name}</h1>
      <p>{/* add any other stand-up event details here */}</p>
    </div>
  );
};

export default StandUpDetails;
