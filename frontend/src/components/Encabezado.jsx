import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../Styles/global.css';



export function Encabezado() {
  const [token, setToken] = useState(null);

  const [openProfileOptions, setOpenProfileOptions] = useState(false);
  const [openMenuOptions, setOpenMenuOptions] = useState(false);
  const [textAdjustOptions, setTextAdjustOptions] = useState(false);
  const [textSize, setTextSize] = useState('16px');

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const adjustTextSize = (size) => {
    setTextSize(size);
    document.documentElement.style.setProperty('--text-size', size); // Aplicar estilo global
    setTextAdjustOptions(false); // Cerrar el menú después de seleccionar
  };


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  
  const handleHome = () => {
    window.location.href = '/home';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login'; // Redirigir a la página de login
  };
  return (
    <header className='headerPrincipal'>
      <section onClick={handleHome}>

      <img className='logo' src="/images/CocoonIcon.png"  alt="logo" />
      <h2 className='nombreApp'> Cocoon</h2>
      </section>
      <section className="contenedorMenu">
        <div className="iconos">
          <div className="icono" onClick={() => {
            setOpenMenuOptions(((prev) => !prev))
            setOpenProfileOptions(false)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
              <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            </svg>

          </div>
          <div className="icono" onClick={() => {
            setOpenProfileOptions((prev) => !prev)
            setOpenMenuOptions(false)
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="siz</svg>e-6">
              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
            </svg>

          </div>

        </div>

        {

          openMenuOptions &&
          <section className="dropDownMenu">
            <div>
              <a href='/formulario' className='styled-link'> Agrega tu hogar</a>
              
              
              <button
                className='styled-link'
                onClick={() => setIsContactModalOpen(true)}
              >
                Contáctanos
              </button>
              <div>
                <button
                  onClick={() => setTextAdjustOptions((prev) => !prev)}
                  className="styled-link"
                >
                  Ajustar texto
                </button>
                {textAdjustOptions && (
                  <div className='text-adjust-buttons'>
                    <button onClick={() => adjustTextSize('16px')}>Texto Pequeño</button>
                    <button onClick={() => adjustTextSize('20px')}>Texto Mediano</button>
                    <button onClick={() => adjustTextSize('30px')}>Texto Grande</button>
                  </div>
                )}
                </div>
            </div>
            {isContactModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Contáctanos</h2>
              <p><strong>Integrantes:</strong></p>
              <ul>
                <li>Nicolás Mauricio Rojas - 2259460</li>
                <li>Víctor Manuel Hernandez - 2259520</li>
                <li>Jhon Alejandro Martínez - 2259565</li>
                <li>Juan Miguel Posso - 2259610</li>
                <li>Esteban Revelo - 2067507</li>
              </ul>
              <p><strong>Correo electrónico:</strong> contacto@cooconhome.com</p>
              <p><strong>Líneas de atención:</strong></p>
              <ul>
                <li>+57 300 123 4567</li>
                <li>+57 310 765 4321</li>
              </ul>
              <p>Si tienes algún problema, no dudes en comunicarte con nuestras líneas de atención.</p>
              <button onClick={() => setIsContactModalOpen(false)}>Cerrar</button>
            </div>
          </div>
        )}
          </section>
        }


        
        
        {

          openProfileOptions &&
          <section className="dropDownProfile" >
            <div>
            {token ? (
                  <>
                    <a href="/perfil" className='styled-link'>Perfil</a>
                    <button onClick={handleLogout} className='styled-link'>Cerrar Sesión</button>
                  </>
                ) : (
                  <>
                    <a href="/login" className='styled-link'>Iniciar Sesión</a>
                    <a href="/registro" className='styled-link'>Registrarse</a>
                  </>
                )}
            </div>
              
          </section>

        }

      </section >

    </header>
  )
}