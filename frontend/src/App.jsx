import TenantProfile from './components/ComponentesProfile/TenantProfile.jsx'; // Importa el componente TenantProfile
import OwnerProfile from './components/ComponentesProfile/OwnerProfile.jsx';   // Importa el componente OwnerProfile
import React, { useState, useEffect } from 'react';
import { FormularioLogin } from './components/ComponentesLogin/FormularioLogin.jsx'
import { FormularioRegistro } from './components/ComponentesLogin/FormularioRegistro.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { FormularioPropiedades } from './components/componentesFormulario/FormularioPropiedades.jsx'
import { HomePage } from './components/componentesHome/HomePage.jsx';
import { PropiedadDetails } from './components/componentesPropiedades/PropiedadDetails.jsx'
import {propiedadesHechas } from './logic/constans.js'
import './Styles/App.css'
import './Styles/index.css'

function App() {
  const nombres = localStorage.getItem('nombreUsuario') + ' ' + localStorage.getItem('apellidoUsuario');
  
  const ownerExampleData = {
    name: nombres,
    profilePic: '/example-profile.jpg',
    bio: 'Arrendador con experiencia en propiedades urbanas.',
    email: `${localStorage.getItem('emailUsuario')}`,
    phone: '+52 55 9876 5432',
    properties: [
      {
        id: 1,
        name: 'Departamento en Condesa',
        photos: ['/condesa1.jpg', '/condesa2.jpg'],
        location: 'Condesa, CDMX',
        monthlyPrice: 12000,
        details: {
          rooms: 2,
          bathrooms: 2,
          size: '100m²',
          services: ['Agua', 'Gas', 'Internet'],
        },
        rules: ['No mascotas', 'No fiestas'],
      },
    ],
    verifications: {
      idVerified: true,
      propertyOwnership: true,
    },
  };

  // Datos de ejemplo para TenantProfile
  console.log(nombres);
  const tenantExampleData = {
    name: nombres,
    profilePic: '/example-tenant-profile.jpg',
    bio: 'Estudiante de ingeniería en busca de un apartamento cerca de la universidad.',
    email: `${localStorage.getItem('emailUsuario')}`,
    phone: '+57 123 456 7890',
    rentalHistory: [
      {
        comment: 'Muy buena inquilina.',
        previousRentals: 2,
      },
    ],
    preferences: {
      propertyTypes: ['Estudio', 'Departamento compartido', 'Casa'],
      monthlyBudget: '$500 - $1000',
      preferredLocation: 'Cerca de la universidad',
    },
    verifications: {
      idVerified: true,
      incomeProof: true,
      socialMedia: true,
    },
  };

  useEffect(() => {
    const sessionFlag = 'session_initialized';

    if (!sessionStorage.getItem(sessionFlag)) {
      // Limpiar localStorage y establecer la bandera
      localStorage.clear();
      
      sessionStorage.setItem(sessionFlag, 'true');
    }
  }, []);

  // Datos de ejemplo para OwnerProfile
  
       
  return (

    <main className='homePage'>

      <BrowserRouter>
      
        <Route path='/formulario'>  <FormularioPropiedades></FormularioPropiedades></Route>
 
        <Switch>
        <Route path='/perfil'> 
        {localStorage.getItem('tipoUsuario') == 'arrendador' ? 
        <OwnerProfile userData={ownerExampleData} /> :<TenantProfile userData={tenantExampleData} />

        }
        
        </Route>
          <Route path='/login' component={FormularioLogin}/>
          <Route path='/registro' component={FormularioRegistro} />
          <Route path='/propiedad/:id' component={PropiedadDetails} />
          <Route path='/' component={HomePage}/>
        </Switch>
      </BrowserRouter>

    </main>
  );
}

export default App
