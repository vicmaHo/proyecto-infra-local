import React, { useEffect, useState } from 'react';
import "../../Styles/global.css";
import {
  Modal, Button, Card, CardContent, Typography,
  LinearProgress
} from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { FormularioItems } from './FormularioItems';
import Swal from 'sweetalert2';
import { agregarPropiedadBack } from '../../logic/constans';


export function FormularioPropiedades() {

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const [formulario, setFormulario] = useState({
    idArrendador: `${localStorage.getItem('idUsuario')}`,
    nombrePropiedad: '',
    direccion: '',
    descripcion: '',
    reglas: '',
    precio: '',
    habitaciones: '',
    tipoPropiedad: '',
    banos: '',
    huespedes: '',
    amenidades: [],
    fotos: [],
    videos: []
  });
  const [progreso, setProgreso] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormulario({ ...formulario, [name]: [...formulario[name], ...files] });
  };

  const handleAmenidadChange = (amenidad) => {
    const nuevasAmenidades = formulario.amenidades.includes(amenidad)
      ? formulario.amenidades.filter(a => a !== amenidad)
      : [...formulario.amenidades, amenidad];
    setFormulario({ ...formulario, amenidades: nuevasAmenidades });
  };

  const calcularProgreso = () => {
    const campos = ['direccion', 'precio', 'habitaciones', 'banos', 'huespedes', 'descripcion', 'reglas', 'tipoPropiedad'];
    const camposLlenos = campos.filter(campo => formulario[campo] !== '').length;
    const progresoArchivos = (formulario.fotos.length > 0 || formulario.videos.length > 0) ? 1 : 0;
    const progresoAmenidades = formulario.amenidades.length > 0 ? 1 : 0;
    const nuevoProgreso = ((camposLlenos + progresoArchivos + progresoAmenidades) / (campos.length + 2)) * 100;

    setProgreso(Math.round(nuevoProgreso));
  };

  const agregarPropiedad = () => {
    if (formulario.direccion && formulario.precio && formulario.habitaciones && formulario.huespedes && formulario.descripcion
      && formulario.reglas && formulario.tipoPropiedad && formulario.amenidades.length > 0 
      && formulario.nombrePropiedad) {
      const data = {
        arrendador: parseInt(formulario.idArrendador),
        cantidad_banos:  parseInt(formulario.banos) ,
        cantidad_habitaciones: parseInt(formulario.habitaciones),
        cantidad_huespedes: parseInt(formulario.huespedes),
        descripcion: formulario.descripcion,
        direccion: formulario.direccion,
        estado: 'disponible',
        fotos: formulario.fotos.length > 0 ? formulario.fotos[0] : null,
        nombre: formulario.nombrePropiedad,
        precio: parseInt(formulario.precio),
        reglas: formulario.reglas,
        servicios: formulario.amenidades.join(', '),
        tipo_vivienda: formulario.tipoPropiedad,
        videos: formulario.videos.length > 0 ? formulario.videos[0] : null 


      };

      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      Swal.fire({
        title: 'Agregando Propiedad...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      console.log(formData);
      if (agregarPropiedadBack(formData).then(([ok]) => {

        if (ok) {
          Swal.fire({
            title: 'Propiedad Agregada Correctamente',
            icon: 'success',
            confirmButtonText: 'Cerrar'
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = '/'
            }
          });
        }
      }));
      limpiarFormulario();
      handleClose();
    } else {
      alert('Por favor, llena todos los campos obligatorios');
    }
  };

  const limpiarFormulario = () => {
    setFormulario({
      idArrendador: '',
      nombrePropiedad: '',
      direccion: '',
      descripcion: '',
      precio: '',
      reglas: '',
      tipoPropiedad: '',
      habitaciones: '',
      banos: '',
      huespedes: '',
      amenidades: [],
      fotos: [],
      videos: []
    });
  };

  useEffect(() => {
    calcularProgreso();
  }, [formulario]);
  return (


    <main>
      {localStorage.getItem('token') === null && (
        // Add any content you want to render when the token is null
        Swal.fire({
          title: 'No tienes permiso para acceder',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/login'
          }
        })
      )}
      {localStorage.getItem('tipoUsuario') == "arrendatario" && (
        // Add any content you want to render when the token is null
        Swal.fire({
          title: 'No tienes permiso para acceder',
          icon: 'error',
          confirmButtonText: 'Cerrar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/'
          }
        })
      )}
      
      <Modal open={open} onClose={handleClose} style={{ padding: '16px', maxWidth: '600px', margin: '0 auto',fontSize: 'var(--text-size)' }}>
        <Card style={{ marginBottom: '16px', maxWidth: '100vh', maxHeight: '80vh', overflowY: 'auto', fontSize: 'var(--text-size)' }}>
          <CardContent>
            
            <Button href='/' style={{ float: 'right', borderRadius: '20px' }} variant='contained'><Cancel /></Button>
            <h1>Agregar Propiedad</h1>
            <LinearProgress variant="determinate" value={progreso} style={{ margin: '16px' }} />
            <FormularioItems
              formulario={formulario}
              agregarPropiedad={agregarPropiedad}
              handleAmenidadChange={handleAmenidadChange}
              handleFileChange={handleFileChange}
              handleInputChange={handleInputChange}>
            </FormularioItems>
          </CardContent>
        </Card>
      </Modal>
      

    </main>
  );
};