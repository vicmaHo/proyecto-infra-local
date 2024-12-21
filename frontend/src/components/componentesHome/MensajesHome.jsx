import { Info } from '@mui/icons-material';
export function MensajesHome() {
  return (
    <main className='grid'>

      <section className='contenidoMensaje'>

        <Info style={{ fontSize: "50px", marginTop: '14px' }}></Info>
        <div className='tituloMensaje'>

          <h2 >Tu próximo hogar te está esperando</h2>
          <p>Encuentra apartamentos, casas y apartaestudios ideales para ti. ¡No esperes más!</p>
        </div>
      </section>

      <section className='contenidoMensaje'>

        <Info style={{ fontSize: "50px", marginTop: '14px' }}></Info>
        <div className='tituloMensaje'>

          <h2 >Un hogar a tu medida</h2>
          <p>Apartamentos, casas y apartaestudios diseñados para tu comodidad. ¡Encuentra el tuyo!</p>
        </div>
      </section>

      
      <section className='contenidoMensaje'>

        <Info style={{ fontSize: "50px", marginTop: '14px' }}></Info>
        <div className='tituloMensaje'>

          <h2 >El espacio que buscas</h2>
          <p>Descubre hogares acogedores y llenos de vida. ¡Tu próximo hogar te espera!</p>
        </div>
      </section>
    </main>
  )
}