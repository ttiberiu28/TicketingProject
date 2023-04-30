import React, { useState, useEffect } from 'react';
import RestClient from '../../REST/RestClient';
import { MyLocation } from '../../interfaces/MyLocation';
import '.././CSS/MyLocations.css';
import { Col, Container, Row, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import BannerCarousel from '../BannerCarousel';
import "../CSS/EventDetails.css";
import CartModal from '../CartComp/CartModal';


export default function MyLocations() {
  const [locations, setLocations] = useState<MyLocation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState('');

  const locationsPerPage = 4;
  const totalPages = Math.ceil(locations.length / locationsPerPage);

  useEffect(() => {
    handleLocations();
  }, []);

  const handleLocations = () => {
    const promise = RestClient.getLocations();
    promise.then((data) => setLocations(data));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * locationsPerPage;
  const endIndex = startIndex + locationsPerPage;

  const filteredLocations = locations.filter((location) =>
    location.place.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="background-div">
      <BannerCarousel />

      <Navbar className="navbar navbar-expand-lg navbar-dark sticky-top gradient-custom-search-bar" bg="dark" variant="dark">
        <Container fluid>
          <CartModal />

          <Form className="d-flex ms-auto">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2"
              aria-label="Search"
              style={{ width: '300px', backgroundColor: '#e9ecef' }}
              value={searchValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
            />
          </Form>
        </Container>
      </Navbar>

      <Container className=" ">
        <Col className="text-center">

          <Row className="justify-content-center">
            {filteredLocations.slice(startIndex, endIndex).map((location, index) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
                className="mb-4 d-flex align-items-stretch"
              >
                <div className="card w-100 card-gradient">

                  <div className="bg-image hover-overlay hover-zoom ripple rounded">
                    <Link to={`/location/${location.id}`}>

                      <img
                        src={location.imageUrl}
                        className="img-fluid carousel-img my-location-img"
                        alt={location.place}
                      />
                      <div
                        className="mask"
                        style={{ backgroundColor: 'rgba(126, 243, 188, 0.2)' }}
                      ></div>
                    </Link>

                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title card-titlee-bold">{location.place}</h5>
                    <p className="card-text card-bodyy-light">{location.city}</p>
                  </div>

                </div>
              </Col>
            ))}
          </Row>

          <nav aria-label="Page navigation example">
            <ul className="pagination pagination-circle justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <a className="page-link">Prev</a>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                >
                  <a className="page-link" href="#">
                    {i + 1}
                    {currentPage === i + 1 && (
                      <span className="visually-hidden">(current)</span>
                    )}
                  </a>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <a className="page-link">Next</a>
              </li>
            </ul>
          </nav>

        </Col>
      </Container>
    </div >
  );
}
