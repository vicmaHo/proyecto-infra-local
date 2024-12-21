import { useState } from "react"
import logo from "/images/CocoonIcon.png"
import "../../Styles/FormularioLogin.css"
import { loginUser } from "../../logic/constans";
import Swal from 'sweetalert2';


export function FormularioLogin() {

    const [usuario, setUsuario] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const handleSubmit = (evento) => {
        evento.preventDefault()

        //Validacion de que los campos han sido llenados
        if (usuario == "" || password == "") {
            setError(true)
            return
        }
        setError(false)

        const data = {
            "username": usuario,
            "password":password
        }

        Swal.fire({
            title: 'Iniciando Sesión...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        

        if(loginUser(data).then(([data, ok]) => {
            
            if (ok) {
                Swal.fire({
                    title: 'Sesión Iniciada Correctamente',
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = '/'
                    }
                  });
                }
        }));
    }

    return (
        <section className="login-container">
            <div className="logo-container">
                <img src={logo} alt="Logo de la empresa" className="logo" />
            </div>
            <div className="login-content">
                <h1>Iniciar Sesión</h1>

                <form
                    className="formulario"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        value={usuario}
                        //Captura lo que se ingresa en la caja de texto
                        onChange={evento => setUsuario(evento.target.value)}
                        placeholder="Usuario"//Muestra dentro de la caja de texto "Usuario"
                        aria-label="Usuario" //->Ofrece accesibilidad para aquellas personas que no tienen vision y usan programas de lectura
                    />
                    <input
                        type="password"
                        value={password}
                        //Captura lo que se ingresa en la caja de texto
                        onChange={evento => setPassword(evento.target.value)}
                        placeholder="Contraseña"//Muestra dentro de la caja de texto "Contraseña"
                        aria-label="Contraseña"//->Ofrece accesibilidad para aquellas personas que no tienen vision y usan programas de lectura
                    />
                    <button>Iniciar Sesión</button>


                </form>
                {error && <p className="error-message">Todos los campos son obligatorios</p>}

                {/* Hipervínculo de "¿Olvidaste tu contraseña?" */}
                <div className="forgot-password">
                    <a href="#">¿Olvidaste tu contraseña?</a> {/*En # va el link hacia la pagina que recupera la contraseña */}
                </div>
                <div className="forgot-password">
                    <a href="/registro">¿No tienes una cuenta? Registrate</a> {/*En # va el link hacia la pagina que recupera la contraseña */}
                </div>


            </div>
        </section>
    )
}