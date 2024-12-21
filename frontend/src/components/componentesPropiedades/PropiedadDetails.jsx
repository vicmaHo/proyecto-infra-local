import React from "react";
import { useEffect, useState } from 'react';
import { propiedadesHechas , cargarArrendadores , cargarPropiedades, hacerReserva, hacerResena } from '../../logic/constans.js'
import "../../Styles/PropiedadDetails.css";
import CarouselReviews from "../CarouselReviews"; // Ruta al componente
import MapComponent from '../MapComponent.jsx';
import "../../Styles/CarouselReviews.css";
import ReviewComment from "../ReviewComment";
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import WifiIcon from '@mui/icons-material/Wifi';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShowerIcon from '@mui/icons-material/Shower';
import CropFreeIcon from '@mui/icons-material/CropFree';
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import { Modal, Box, Button, TextField } from '@mui/material';
import { Encabezado } from "../Encabezado.jsx";
import { Light, Water, WaterfallChartTwoTone } from "@mui/icons-material";

//una linea
import { getCoordinates } from '../getCordenadas.jsx';

import Swal from "sweetalert2";






export function PropiedadDetails({ match }) {
  const { id } = match.params; // Accede al ID desde los parámetros de la URL
  const [propiedad, setPropiedad] = useState(null);

  const [open, setOpen] = useState(false); // Estado del modal
  const [startDate, setStartDate] = useState(""); // Fecha de inicio
  const [endDate, setEndDate] = useState(""); // Fecha de fin
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [arrendadores, setArrendadores] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  //un linea abajo
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [openResena, setOpenResena] = useState(false);
  const [isConfirmedResena, setIsConfirmedResena] = useState(false);



  useEffect(() => {
    // Busca la propiedad por ID en el array de propiedades
    // const propiedadSeleccionada = propiedadesHechas.find((p) => p.id === parseInt(id));
    // setPropiedad(propiedadSeleccionada);
    cargarArrendadores().then((arrendadores) => {
      setArrendadores(arrendadores);
    });
    cargarPropiedades().then((p) => {
      const propiedadSelected = p.find((propiedades) => propiedades.id === parseInt(id));
      setPropiedad(propiedadSelected);
    });

    
  }, [id]);


  useEffect(() => {
    // Obtener coordenadas si la dirección está disponible
    if (propiedad && propiedad.direccion) {
      const fetchCoordinates = async () => {
        const coords = await getCoordinates(propiedad.direccion);
        if (coords) {
          setCoordinates([coords.lat, coords.lng]);
        }
      };

      fetchCoordinates();
    }
  }, [propiedad]);

  // Funciones para abrir y cerrar el modal de las reservas

  const handleOpen = () => {
    if (localStorage.getItem('tipoUsuario') == 'arrendador') {
      Swal.fire({

        title: 'No puedes reservar una propiedad',
        text: 'Solo los arrendatarios pueden reservar propiedades',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
      return;
    }
    
    setOpen(true)};

  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    setIsConfirmed(true);
    const data ={
      propiedad: propiedad.id,
      fecha_inicio: startDate,
      fecha_final: endDate,
      arrendatario: parseInt(localStorage.getItem('idUsuario')),

    }
    console.log(data);
    hacerReserva(data);
    handleClose(); 
  };

  //funciones para abrir y cerrar el modal para hacer reseña
  const handleOpenResena = () => setOpenResena(true);
  const handleCloseResena = () => setOpenResena(false);
  const handleConfirmResena = () => {
    setIsConfirmedResena(true);
    /* const data ={
      propiedad: propiedad.id,
      comentario: comentario,
      calificacion: calificacion,
      arrendatario: propiedad.arrendador,
    }
    console.log(data);
    hacerResena(data); */
    handleCloseResena();
  };
  
  


  if (!propiedad) {
    return <div>Cargando propiedad...</div>;
  
  }



  const maxLength = 500;
  return (
    <section> 
    <Encabezado></Encabezado>   
      
      <div className="layout-details">
      <aside>
        <div className="image-container">
          <img src={propiedad.fotos} alt="Propiedad" />
        </div>
      </aside>

      <div>
        <main>
          <h1 className="name-propiedad-details">{propiedad.nombre}</h1>
          <Chip sx={{ bgcolor: "#9ed23b;", color: "#0f4d1a",  fontSize: 12 }} label={propiedad.estado} />
          <h2 className="text-precio">${propiedad.precio} <p className="text-precio-mes">/mes</p></h2>
          <h3 className="texto-subtitulo">Calificación</h3>
          <Rating name="read-only" value={2.5} readOnly precision={0.5} size="large" />
          <p className="texto-subtitulo"></p>
          <button className="button-reserva" onClick={handleOpen}>Reservar</button>

          <Modal open={open} onClose={handleClose}>


            <Box sx={modalStyle}>
              <h2>Reservar propiedad</h2>
              <TextField
                label="Fecha de inicio"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Fecha de fin"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleConfirm}
              >
                Confirmar Reserva
              </Button>
            </Box>
          </Modal>

          {isConfirmed && (
            <div className="confirmation-message">
              <h3>¡Reserva confirmada!</h3>
              <p>El arrendador ha sido notificado sobre tu interés en la propiedad.</p>
              <p>Información de contacto del arrendador:</p>
              <p>Nombre: {arrendadores ?              
              arrendadores.find((arrendador) => arrendador.id === propiedad.arrendador).first_name
            : "Cargando..."}</p>
              <p>Teléfono: {arrendadores ?              
              arrendadores.find((arrendador) => arrendador.id === propiedad.arrendador).telefono
            : "Cargando..."}</p>
            </div>
          )}

          <h3 className="texto-subtitulo">Propietario</h3>
          <Stack direction="row" >
            <Avatar sx={{ width: 70, height: 70 }} alt="Remy Sharp" src="../public/images/revelo.png" />
            <p className="name-propietario" >{arrendadores ?              
              arrendadores.find((arrendador) => arrendador.id === propiedad.arrendador).first_name
            : "Cargando..."}</p>
          </Stack>
        </main>
      </div>

      <div className="additional-info">
        <div className="box-servicios">
          <button className="button-servicios"> <Light fontSize="large" color="primary" />Conexion Wifi</button>
          <button className="button-servicios"> <Water fontSize="large" color="primary" />Metros Cuadrados</button>
          <button className="button-servicios"> <DirectionsCarIcon fontSize="large" color="primary" />Estacionamiento</button>
          <button className="button-servicios"> <ShowerIcon fontSize="large" color="primary" />Baño</button>
          <button className="button-servicios"> <ElectricalServicesIcon fontSize="large" color="primary" />Servicios publicos</button>
        </div>
        <div className="principal-info">

          <div className="info-item">
            <h2>Ubicación</h2>


            <p>{propiedad.direccion}</p>
          </div>
          <div className="title-wrapper">
            <div className="title-divider"></div>
            <h2 >Descripción</h2>
          </div>
          <ReviewComment text={propiedad.descripcion} maxVisibleChars={300} />

          <div className="title-wrapper">
            <div className="title-divider"></div>
            <h2>Reglas</h2>
          </div>
          <div className="rules-section">
            <ul className="rules-list">
              
              {propiedad.reglas.split(',').map((regla, index) => (
                <li key={index}>{regla}</li>
              ))}
              </ul>
          </div>
          <div className="title-wrapper">
            <div className="title-divider"></div>
            <h2>Tipo de vivienda</h2>
          </div>
          <p>{propiedad.tipo_vivienda}</p>
          <div className="title-wrapper">
            <div className="title-divider"></div>
            <h2>Reseñas</h2>
          </div>
          <CarouselReviews propiedadId={propiedad.id}/>

          <div className="landlord-card">
            <img src="/image.png" alt="Foto del arrendador" className="landlord-image" />
            <div className="landlord-info">
              <h3 className="landlord-name">{arrendadores ?              
              arrendadores.find((arrendador) => arrendador.id === propiedad.arrendador).first_name
            : "Cargando..."}</h3>
              <p className="landlord-rating">
                <span>Calificación:</span>
                <Rating name="read-only" value={4.5} readOnly precision={0.5} size="small" />
              </p>
              <p className="landlord-registered">Registrado hace 2 años</p>

            </div>
          </div>
          <div>
            <h3>Sobre mi</h3>
            <p>Me gusta viajar y conocer nuevas culturas. Soy una persona amigable y me gusta conocer gente nueva.</p>
            <p>Si tienes alguna pregunta sobre la propiedad, no dudes en contactarme.</p>
            <button className="button-contact" onClick={handleOpenResena}>Deja tu reseña</button>
            <Modal open={openResena} onClose={handleCloseResena}>
              <Box sx={modalStyle}>
                <h2>Deja tu reseña</h2>
                <p>Califica tu experiencia con el arrendador, recuerda ser respetuoso sobre cualquier cosa, o tu comentario sera eliminado</p>
                <TextField
                  label="Comentario"
                  multiline
                  rows={4}
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  fullWidth
                  margin="normal"
                  maxLength={maxLength}
                />
                <Rating
                  name="simple-controlled"
                  value={calificacion}
                  precision={0.5}
                  onChange={(event, newValue) => {
                    setCalificacion(newValue);
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleConfirmResena}
                >
                  Confirmar Reseña
                </Button>
              </Box>

            </Modal>
            {isConfirmedResena && (
            <div className="confirmation-message">
              <h3>¡Reseña Publicada!</h3>
              <p>Tu comentario fue publicado correctamente a esta propiedad.</p>
              <p>Información de contacto del arrendador que opinaste:</p>
              <p>Nombre: {arrendadores ?              
              arrendadores.find((arrendador) => arrendador.id === propiedad.arrendador).first_name
            : "Cargando..."}</p>
              <p>Teléfono: {arrendadores ?              
              arrendadores.find((arrendador) => arrendador.id === propiedad.arrendador).telefono
            : "Cargando..."}</p>
            </div>
          )}
          </div>
          

        </div>
        <div>
            <h2>En donde viviras</h2>
            {/* En caso de que no funcione solo dejar  <MapComponent position={coordinates} /> */}
            {coordinates ? (
                <MapComponent position={coordinates} />
              ) : (
                <p>Obteniendo ubicación...</p>
              )}
          </div>

      </div>
    </div>
    </section>

  );
}



const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};