import React  from "react";
import { useHistory } from 'react-router-dom';



export function Propiedad({id,tituloPropiedad, nombreArrendador,descripcion, foto}) {
  const history = useHistory(); // Hook para la navegación

  const openDetails = () => {
    history.push(`/propiedad/${id}`); // Navega a la ruta de detalles con el ID
  };

  return (
    <main className='propiedad' onClick={openDetails}>
      <section className="contenedorImagenes">
        <img className='imagenes' src={foto} alt="" />
      </section>
      <section className='textos' >
        <h1>{tituloPropiedad}</h1>
        <p>Arrendador:  <span className='propietarioPropiedad'>{nombreArrendador}</span></p>
       </section>

    </main>
  )
}

