import React, { useEffect, useState } from "react";
import { Carousel, Card } from "react-bootstrap";
import axiosClient from "../../axios/axios-client";

const ApiCarousel = () => {
    const [proizvodi,setProizvodi] = useState([]);
  useEffect(() => {

    const fetchProizvodi = async () =>{
        const response = await axiosClient.get("proizvodi");
        setProizvodi(response.data);
        console.log(proizvodi);
    }

    fetchProizvodi();
  }, []);

  return (
    <div className="w-100 d-flex justify-content-center my-4">
      <Carousel interval={3000} style={{ maxWidth: "400px", width: "100%" }}>
        {proizvodi.map((proizvod, index) => (
          <Carousel.Item key={index}>
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title>{proizvod.naziv}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Kategorija: {proizvod.kategorija}
                </Card.Subtitle>
                <Card.Text>Cena: {proizvod.cena} €</Card.Text>
              </Card.Body>
            </Card>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ApiCarousel;
