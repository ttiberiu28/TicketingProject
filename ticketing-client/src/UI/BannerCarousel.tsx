import { Container, Row, Col, Card, Button, Collapse, Carousel } from 'react-bootstrap';

export default function BannerCarousel() {

    return(
        <Carousel
              className="carousel-container"
              prevIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon custom-arrow custom-prev"
                />
              }
              nextIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-next-icon custom-arrow custom-next"
                />
              }>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://lumiere-a.akamaihd.net/v1/images/avatar-twow-videobg01_cdd3dcb8.jpeg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://images.unsplash.com/photo-1537724841875-c0901308941f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 carousel-img"
                  src="https://images.unsplash.com/photo-1574894078563-01e879b89809?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80"
                  alt="Third slide"
                />
              </Carousel.Item>
      </Carousel>
    )
}