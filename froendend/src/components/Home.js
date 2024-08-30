import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, Card, Row, Col, Container } from 'react-bootstrap';
import { getPeliculas } from '../actions/peliculasActions';
import "../styles/home.css";

const Home = () => {
  const [peliculas, setPeliculas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const data = await getPeliculas();
        setPeliculas(data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchPeliculas();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/peliculas/${id}`);
  };

  const groupedPeliculas = [];
  for (let i = 0; i < peliculas.length; i += 4) {
    groupedPeliculas.push(peliculas.slice(i, i + 4));
  }

  return (
    <Container>
      <h2 className="mt-5">Bienvenido a la App de Películas</h2>
      
      {/* Carrusel */}
      <Carousel className="mt-4" interval={3000} controls={true} indicators={true}>
        {groupedPeliculas.map((group, index) => (
          <Carousel.Item key={index}>
            <Row>
              {group.map((pelicula) => (
                <Col key={pelicula.id} sm={8} md={3} onClick={() => handleCardClick(pelicula.id)}>
                  <Card className="mb-4" style={{ cursor: 'pointer', border: 'none' }}>
                    <Card.Img variant="top" src={pelicula.imagen} style={{ objectFit: 'cover', height: '400px' }} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Tarjetas de todas las películas */}
      <h3 className="mt-5">Todas las Películas</h3>
      <Row className="mt-4">
        {peliculas.map((pelicula) => (
          <Col key={pelicula.id} sm={8} md={3}>
            <Card className="mb-4" onClick={() => handleCardClick(pelicula.id)} style={{ cursor: 'pointer' }}>
              <Card.Img variant="top" src={pelicula.imagen} style={{ objectFit: 'cover', height: '400px' }} />
              <Card.Body>
                <Card.Title>{pelicula.titulo}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
