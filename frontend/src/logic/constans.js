import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL

const urlPropiedades = `${API_URL}/api/propiedades/`;
const urlArrendadores = `${API_URL}/api/arrendadores/`;
const urlArrendatarios = `${API_URL}/api/arrendatarios/`;
const urlRegisterUser = `${API_URL}/auth/register`;
const urlLoginUser = `${API_URL}/auth/login`;
const urlReviewUser = `${API_URL}/api/resenas/`;
const urlReviews = `${API_URL}/api/resenas/`;
const urlReservas = `${API_URL}/api/reservas/`;


export const cargarResenas = async (propiedadId = null) => {
  const url = propiedadId
    ? `${urlReviews}?propiedad=${propiedadId}` // Si el backend permite filtrar por propiedad
    : urlReviews;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  });

  if (!res.ok) {
    throw new Error('Error al cargar las reseñas');
  }

  const data = await res.json();
  return data;
};

export const hacerResena = async (resena) => {
  const respose = await fetch(urlReviewUser, {
    method: 'POST',  
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    body: json.stringify(resena),
  }).then(response => response.json())
  .then(data => console.log('Éxito:', data))
  .catch(error => Swal.fire({
    title: 'Error al hacer la reseña',
    icon: 'error',
    confirmButtonText: 'Cerrar'

  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = '/propiedades'
    }}) );
  ;

  return respose;
};



export const cargarArrendatarios = async () => {
  const array = [];
  // const res = await fetch('data.json');
  const res = await fetch(urlArrendatarios, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  });
  const data = await res.json();

  data.forEach(propiedad => {
    array.push(propiedad);

  });

  return array;
};




export const cargarArrendadores = async () => {
  const array = [];
  // const res = await fetch('data.json');
  const res = await fetch(urlArrendadores, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  });
  const data = await res.json();

  data.forEach(propiedad => {
    array.push(propiedad);

  });

  return array;
};

export const registerUser = async (user) => {
  const respose = await fetch(urlRegisterUser, {
    method: 'POST',

    body: user,
  }).then(response => response.json())
    .then(data => console.log('Éxito:', data))
    .catch(error =>
      Swal.fire({
        title: 'Error al registrar el usuario',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = '/login'
        }
      })
    );

  return [true];
}

export const loginUser = async (user) => {

  const respose = await fetch(urlLoginUser, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),
  });

  if (!respose.ok) {
    Swal.fire({
      title: 'Error al iniciar sesion',
      icon: 'error',
      confirmButtonText: 'Cerrar'

    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/login'
      }
    });
    throw new Error('Error al iniciar sesion');

  }

  const data = await respose.json();


  console.log(data);

  localStorage.setItem('tipoUsuario', data.tipo);
  localStorage.setItem('idUsuario', data.datos.id);
  localStorage.setItem('nombreUsuario', data.datos.first_name);
  localStorage.setItem('apellidoUsuario', data.datos.last_name);
  localStorage.setItem('emailUsuario', data.datos.email);
  localStorage.setItem('token', data.token);

  return [data, true];
}



export const hacerReserva = async (reserva) => {
  const respose = await fetch(urlReservas, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(reserva),
  }).then(response => response.json())
    .then(data => console.log('Éxito:', data))
    .catch(error => Swal.fire({
      title: 'Error al hacer la reserva',
      icon: 'error',
      confirmButtonText: 'Cerrar'

    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/'
      }
    }));
  ;


  return [true];
}


export const cargarPropiedades = async () => {
  const array = [];
  // const res = await fetch('data.json');
  const res = await fetch(urlPropiedades, {
    method: 'GET',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    }

  });
  const data = await res.json();

  data.forEach(propiedad => {
    array.push(propiedad);

  });

  return array;

}

export const agregarPropiedadBack = async (formData) => {


  const respose = await fetch(urlPropiedades, {
    method: 'POST',
    headers: {
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    body: formData,
  }).then(response => response.json())
    .then(data => console.log('Éxito:', data))
    .catch(error => Swal.fire({
      title: 'Error al agregar la propiedad',
      icon: 'error',
      confirmButtonText: 'Cerrar'

    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = '/'
      }
    }));
  ;



  return [true];
}

export const propiedadesHechas = [
  {
    id: 22,
    nombre: "casa bonita",
    arrendador: 1,
    descripcion: "Casa de playa con piscina y vista al mar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    direccion: "Calle 15 carrera 10b #20-30",
    estado: "disponible",
    fotos: "/public/images/casas.jpg",
    precio: 120000,
    reglas: "No hay",
    servicios: "Ninguno",
    tipo_vivienda: "Habitacion",
    videos: "linkvideos.com",
  },
  {
    id: 32,
    nombre: "casa lujosa",
    arrendador: 1,
    descripcion: "Casa de playa con piscina y vista al mar. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    direccion: "Calle 15 carrera 10b #20-30",
    estado: "disponible",
    fotos: "/public/images/casas.jpg",
    precio: 120000,
    reglas: "No hay",
    servicios: "Ninguno",
    tipo_vivienda: "ApartaEstudio",
    videos: "linkvideos.com",
  },
  {
    id: 42,
    arrendador: 2,
    descripcion: "Apartamento en el centro de la ciudad. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    direccion: "Avenida 7 #45-67",
    estado: "disponible",
    fotos: "/public/images/casas.jpg",
    precio: 150000,
    reglas: "No se permiten mascotas",
    servicios: "Internet, Agua, Luz",
    tipo_vivienda: "Apartamento",
    videos: "linkvideos.com",
  },
  {
    id: 52,
    arrendador: 2,
    descripcion: "Apartamento en el centro de la ciudad con excelente vista. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    direccion: "Avenida 7 #45-67",
    estado: "disponible",
    fotos: "/public/images/casas.jpg",
    precio: 150000,
    reglas: "No se permiten mascotas",
    servicios: "Internet, Agua, Luz",
    tipo_vivienda: "Apartamento",
    videos: "linkvideos.com",
  },

  {
    id: 62,
    arrendador: 2,
    descripcion: "Apartamento en el centro de la ciudad con excelente vista. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    direccion: "Avenida 7 #45-67",
    estado: "disponible",
    fotos: "/public/images/casas.jpg",
    precio: 150000,
    reglas: "No se permiten mascotas",
    servicios: "Internet, Agua, Luz",
    tipo_vivienda: "ApartaEstudio",
    videos: "linkvideos.com",

  },
  {
    id: 72,
    arrendador: 2,
    descripcion: "Apartamento en el centro de la ciudad con excelente vista. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    direccion: "Avenida 7 #45-67",
    estado: "disponible",
    fotos: "/public/images/casas.jpg",
    precio: 150000,
    reglas: "No se permiten mascotas",
    servicios: "Internet, Agua, Luz",
    tipo_vivienda: "ApartaEstudio",
    videos: "linkvideos.com",

  },
  {
    id: 82,
    arrendador: 2,
    descripcion: "Apartamento en el centro de la ciudad con excelente vista. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    direccion: "Avenida 7 #45-67",
    estado: "disponible",
    fotos: "/public/images/casas.jpg",
    precio: 150000,
    reglas: "No se permiten mascotas",
    servicios: "Internet, Agua, Luz",
    tipo_vivienda: "ApartaEstudio",
    videos: "linkvideos.com",

  }
];

