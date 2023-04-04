import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails: React.FC = () => {
  const { index } = useParams<{ index: string }>();

  return <div>Movie {index}</div>;
};

export default MovieDetails;

