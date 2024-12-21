import { useState } from "react"
import logo from "/images/CocoonIcon.png"
import "../../Styles/FormularioRegistro.css"
import { registerUser } from "../../logic/constans";
import Swal from 'sweetalert2';


import { Button } from '@mui/material';

export function FormularioRegistro() {

    const [usuario, setUsuario] = useState("");
    const [rol, setRol] = useState('');
    const [esEstudiante, setEsEstudiante] = useState("");
    const [password, setPassword] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [universidad, setUniversidad ] = useState("");
    const [constanciaEstudiante, setConstanciaEstudiante] = useState(null);
    const [ocupacion, setOcupacion] = useState("");
    const [imagenPerfil, setImagenPerfil] = useState(null);
    const [error, setError] = useState(false);

    const handleSubmit = (evento) => {
        evento.preventDefault()

        //Validacion de que los campos han sido llenados
        if (usuario == "" || password == "" || correo == ""
            || telefono == "" || nombre == "" || apellido == ""
            || ocupacion == "" || rol == "" || esEstudiante == "" 
            || (esEstudiante == 'true' && !universidad) || (esEstudiante == 'true' && !constanciaEstudiante)
        ) {
            setError(true)
            return
        }
        setError(false)
        console.log(imagenPerfil)
        console.log(constanciaEstudiante) 

        const data = {
            "username": usuario,
            "password": password,
            "first_name": nombre,
            "last_name": apellido,
            "email": correo,
            "profile_picture": imagenPerfil ? imagenPerfil : null,
            "telefono": telefono,
            "is_arrendador": (rol == "arrendador") ? true : false,
            "ocupacion": ocupacion,
            "is_estudiante": (esEstudiante == "true") ? true : false,
            "constancia_universidad": (esEstudiante == "true") ? constanciaEstudiante : null,
            "universidad": (esEstudiante == "true") ? universidad : "None"
        }

        console.log(data)
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }

        Swal.fire({
            title: 'Registrando usuario...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        if (registerUser(formData).then(([ok]) => {
            if (ok) {
                Swal.fire({
                    title: 'Usuario registrado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/login'
                    }
                });
            }
        }));


    }

    return (
        <section className="login-containers">
            <div className="logo-containers">
                <img src={logo} alt="Logo de la empresa" className="logo" />
            </div>
            <div className="login-contents">
                <h1>Registrarse</h1>

                <form
                    className="formularios"
                >
                    <input
                        type="text"
                        value={usuario}
                        //Captura lo que se ingresa en la caja de texto
                        onChange={evento => setUsuario(evento.target.value)}
                        placeholder="Nombre de Usuario"//Muestra una descripcion dentro de la caja de texto
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


                    <input
                        type="text"
                        value={nombre}
                        //Captura lo que se ingresa en la caja de texto
                        onChange={evento => setNombre(evento.target.value)}
                        placeholder="Nombre"//Muestra dentro de la caja de texto "Nombre"
                        aria-label="Nombre"//->Ofrece accesibilidad para aquellas personas que no tienen vision y usan programas de lectura
                    />
                    <input
                        type="text"
                        value={apellido}
                        //Captura lo que se ingresa en la caja de texto
                        onChange={evento => setApellido(evento.target.value)}
                        placeholder="Apellido"//Muestra dentro de la caja de texto "Contraseña"
                        aria-label="Apellido"//->Ofrece accesibilidad para aquellas personas que no tienen vision y usan programas de lectura
                    />

                    <input
                        type="email"
                        value={correo}
                        onChange={(evento) => setCorreo(evento.target.value)}
                        placeholder="Correo Electrónico"
                        aria-label="Correo Electrónico"
                    />
                    <input
                        type="text"
                        value={telefono}
                        //Captura lo que se ingresa en la caja de texto
                        onChange={evento => setTelefono(evento.target.value)}
                        placeholder="Telefono"//Muestra dentro de la caja de texto "Contraseña"
                        aria-label="Telefono"//->Ofrece accesibilidad para aquellas personas que no tienen vision y usan programas de lectura
                    />
                    <input
                        type="text"
                        value={ocupacion}
                        //Captura lo que se ingresa en la caja de texto
                        onChange={evento => setOcupacion(evento.target.value)}
                        placeholder="Ocupacion"//Muestra dentro de la caja de texto "Contraseña"
                        aria-label="Ocupacion"//->Ofrece accesibilidad para aquellas personas que no tienen vision y usan programas de lectura
                    />

                    <input
                        type="file"
                        accept=".png, .jpg, .jpeg"
                        style={{ display: 'none' }}
                        id="profile-button"
                        onChange={(evento) => setImagenPerfil(evento.target.files[0])}
                    />
                    <label htmlFor="profile-button">
                        <Button variant="outlined" component="span" color="info">
                            Subir foto de perfil
                        </Button>
                    </label>

                    {imagenPerfil && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>

                        {imagenPerfil.name}

                    </div>}
                    <select value={rol} onChange={evento => setRol(evento.target.value)}>
                        <option value="" disabled>Tipo de usuario</option>
                        <option value="arrendador"> Arrendador</option>
                        <option value="arrendatario">Arrendatario</option>
                    </select>
                    <select value={esEstudiante} onChange={evento => setEsEstudiante(evento.target.value)}>
                        <option value="" disabled>¿Eres estudiante?</option>
                        <option value="true"> Si</option>
                        <option value="false">No</option>
                    </select>



                    {
                        (esEstudiante == 'true') &&
                        <input
                            type="text"
                            value={universidad}
                            onChange={evento => setUniversidad(evento.target.value)}
                            placeholder="Nombre de la Universidad"
                            aria-label="Universidad" />

                    }


                    <input
                        type="file"
                        accept=".pdf"
                        style={{ display: 'none' }}
                        id="constancia-button"
                        onChange={(evento) => setConstanciaEstudiante(evento.target.files[0])}
                    />
                    {

                        (esEstudiante == 'true') &&

                        <label htmlFor="constancia-button">
                            <Button variant="outlined" component="span" color="info">
                                Subir Constancia
                            </Button>
                        </label>
                    }

                    {constanciaEstudiante && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>

                        {constanciaEstudiante.name}

                    </div>}
                </form>
                <button onClick={handleSubmit} className="button-register">Registrarse</button>

                {error && <p className="error-message">Todos los campos son obligatorios</p>}

                {/* Hipervínculo de ¿Ya tienes una cuenta? Inicia Sesión */}
                <div className="forgot-password">
                    <a href="/login">¿Ya tienes una cuenta? Inicia Sesión</a> {/*En # va el link hacia la pagina login */}
                </div>


            </div>
        </section>
    )
}