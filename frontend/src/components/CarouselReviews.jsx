import React, { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import ReviewComment from "./ReviewComment"; // Componente para gestionar los comentarios largos
import "../Styles/CarouselReviews.css";
import { cargarResenas,cargarArrendatarios } from '../logic/constans.js'; // Función que carga las reseñas desde el backend


const CarouselReviews = ({ propiedadId }) => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [arrendatarios, setArrendatarios] = useState([]);
  

  // Cargar las reseñas asociadas a la propiedad
  useEffect(() => {
    if (propiedadId) {
      cargarResenas(propiedadId)
        .then((data) => {
          setReviews(data); // Establece las reseñas obtenidas
        })
        .catch((error) => {
          console.error("Error al cargar las reseñas:", error); // Maneja errores de carga
        });
    }
  }, [propiedadId]); // Se ejecuta cada vez que cambia el ID de la propiedad

  useEffect(() => {
    cargarArrendatarios()
      .then((arrendatarios) => {
        setArrendatarios(arrendatarios);
      })
      .catch((error) => {
        console.error("Error al cargar los arrendatarios:", error);
      });
  }, []);

  // Función para ir al comentario anterior
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  // Función para ir al siguiente comentario
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  // Si no hay reseñas, muestra un mensaje alternativo
  if (reviews.length === 0) {
    return <p>No hay reseñas disponibles para esta propiedad.</p>;
  }

  return (
    <div className="carousel-container">
      {/* Botón para ir al comentario anterior */}
      <button className="carousel-button left" onClick={handlePrev}>
        &#8592;
      </button>

      {/* Carrusel de reseñas */}
      <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 70}%)` }}>
        {reviews.map((review) => (
          <div className="carousel-review" key={review.id}>
            <div className="review-header">
              <div className="review-info">
              <h3 className="name-propietario">
                {(() => {
                  try {
                    const arrendatario = arrendatarios.find((arr) => arr.id === review.arrendatario);
                    return arrendatario ? arrendatario.first_name : "No encontrado";
                  } catch (error) {
                    console.error("Error al obtener el nombre del arrendatario:", error);
                    return "Error al cargar nombre";
                  }
                })()}
              </h3>
                <p className="review-date">{`Publicado el ${new Date(review.fecha).toLocaleDateString()}`}</p>
              </div>
              <div className="review-rating">
                <Rating name="read-only" value={review.calificacion} readOnly precision={0.5} size="medium" />
              </div>
            </div>
            <div className="review-comment">
              <ReviewComment text={review.comentario} maxVisibleChars={150} />
            </div>
          </div>
        )
      )}
      </div>

      {/* Botón para ir al siguiente comentario */}
      <button className="carousel-button right" onClick={handleNext}>
        &#8594;
      </button>
    </div>
  );
};

export default CarouselReviews;
