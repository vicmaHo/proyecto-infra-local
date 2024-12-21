import { useState, useEffect } from 'react'
import { cargarArrendadores, cargarPropiedades, propiedadesHechas, cargarArrendatarios } from '../../logic/constans.js'
import { EncabezadoHome } from './EncabezadoHome.jsx'
import { Propiedad } from '../componentesPropiedades/Propiedad.jsx'
import { MensajesHome } from './MensajesHome.jsx'



export function HomePage() {

  const [propiedades, setPropiedades] = useState(null);
  const [arrendadores, setArrendadores] = useState(null);
  const [arrendatarios, setArrendatarios] = useState(null);
  const [token, setToken] = useState(null);

  // Cargar propiedades y arrendadores
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    cargarArrendadores().then((arrendadores) => {
      setArrendadores(arrendadores);
    });
    cargarPropiedades().then((propiedades) => {
      setPropiedades(propiedades);
    });
    cargarArrendatarios().then((arrendatarios) => {
      setArrendatarios(arrendatarios);
    });



  }, []);

  console.log(arrendadores);
  console.log(propiedades);
  console.log(arrendatarios);



  return (
    <main>

      <EncabezadoHome></EncabezadoHome>

      <MensajesHome></MensajesHome>
      <h1 className='tituloHome'>Propiedades de interes</h1>

      <section className='grid'>


        {token ? (propiedades ? (propiedades.map((propiedad) => (
          <Propiedad
            key={propiedad.id}
            id={propiedad.id}
            tituloPropiedad={propiedad.tipo_vivienda}
            nombreArrendador={arrendadores ?              
              arrendadores.find((arrendador) => arrendador.id === propiedad.arrendador).first_name
            : "Cargando..."}
            foto={propiedad.fotos}
            descripcion={propiedad.descripcion}>


          </Propiedad>))) : (<p>Cargando propiedades...</p>
        ))

          : (<p>Por favor inicia sesión para ver las propiedades</p>)



        }


      </section>

    </main>

  )
}