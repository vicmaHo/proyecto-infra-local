import os
import requests
import json


API_URL = "http://localhost:8000"
TOKEN_AUTH = "" # Token de autenticación para peticiones posteriores

##### REGISTRO DE USUARIOS #####

JSON_FILE = "DATA_USUARIOS.json" 
IMAGES_FOLDER = "imagenes/perfil"


with open(JSON_FILE, "r") as file:
    users_data = json.load(file)

# Enviar cada usuario con su imagen correspondiente
for index, user in enumerate(users_data, start=1):
    # Nombre de la imagen correspondiente
    image_path = os.path.join(IMAGES_FOLDER, f"profile{index}.jpg")
    
    if not os.path.exists(image_path):
        print(f"Advertencia: Imagen no encontrada para {user['username']} en {image_path}.")
        continue

    # Crear un objeto form-data
    form_data = {
        "username": user["username"],
        "password": user["password"],
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": user["email"],
        "telefono": user["telefono"],
        "is_arrendador": str(user["is_arrendador"]).lower(),
        "ocupacion": user["ocupacion"],
        "is_estudiante": str(user["is_estudiante"]).lower(),
        "constancia_universidad": user["constancia_universidad"],
        "universidad": user["universidad"]
    }

    # Agregar el archivo de la imagen
    files = {"profile_picture": open(image_path, "rb")}

    try:
        # Realizar la solicitud POST
        response = requests.post(f"{API_URL}/auth/register", data=form_data, files=files)

        # Cerrar el archivo para evitar fugas de recursos
        files["profile_picture"].close()

        # Manejar la respuesta
        if response.status_code == 201:
            print(f"Usuario {user['username']} registrado exitosamente.")
            if index > len(users_data) - 1:
                # Obtener el token de autenticación
                TOKEN_AUTH = response.json()["token"]
                print(f"Token de autenticación obtenido: {TOKEN_AUTH}")
        else:
            print(f"Error al registrar {user['username']}: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error al enviar la solicitud para {user['username']}: {str(e)}")

##### REGISTRO DE CASAS/PROPIEDADES #####

JSON_FILE = "DATA_CASAS.json"
IMAGES_FOLDER = "imagenes/casas"
VIDEO_FOLDER = "imagenes/casa_video"

with open(JSON_FILE, "r") as file:
    propiedad_data = json.load(file)


for index, propiedad in enumerate(propiedad_data, start=1):

    image_path = os.path.join(IMAGES_FOLDER, f"casa{index}.jpeg")
    video_path = os.path.join(VIDEO_FOLDER, f"casa_video_paratodas.mp4")

    if not os.path.exists(image_path):
        print(f"Advertencia: Imagen no encontrada para {propiedad['nombre']} en {image_path}.")
        continue

    # Crear un objeto form-data
    form_data = {
        "arrendador": propiedad["arrendador"],
        "nombre": propiedad["nombre"],
        "tipo_vivienda": propiedad["tipo_vivienda"],
        "descripcion": propiedad["descripcion"],
        "precio": propiedad["precio"],
        "estado": propiedad["estado"],
        "reglas": propiedad["reglas"],
        "servicios": propiedad["servicios"],
        "cantidad_banos": propiedad["cantidad_banos"],
        "cantidad_habitaciones": propiedad["cantidad_habitaciones"],
        "cantidad_huespedes": propiedad["cantidad_huespedes"],
        "direccion": propiedad["direccion"],
    }

    # Agregar el archivo de la imagen
    files = {"fotos": open(image_path, "rb"), "videos": open(video_path, "rb")}
    

    try:
        # Realizar la solicitud POST
        response = requests.post(f"{API_URL}/api/propiedades/", data=form_data, files=files, headers={"Authorization": f"Token {TOKEN_AUTH}"})

        # Cerrar el archivo para evitar fugas de recursos
        files["fotos"].close()
        files["videos"].close()

        # Manejar la respuesta
        if response.status_code == 201:
            print(f"Propiedad {propiedad['tipo_vivienda']} - {propiedad['nombre']} registrada exitosamente.")
        else:
            print(f"Error al registrar {propiedad['tipo_vivienda']} - {propiedad['nombre']}: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error al enviar la solicitud para {propiedad['nombre']}: {str(e)}")


#### REGISTRO DE RESERVAS ####

JSON_FILE = "DATA_RESERVAS.json"

with open(JSON_FILE, "r") as file:
    reserva_data = json.load(file)

for reserva in reserva_data:
    try:
        response = requests.post(f"{API_URL}/api/reservas/", data=reserva, headers={"Authorization": f"Token {TOKEN_AUTH}"})
        if response.status_code == 201:
            print(f"Reserva para propiedad {reserva['propiedad']} registrada exitosamente.")
        else:
            print(f"Error al registrar reserva para propiedad {reserva['propiedad']}: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error al enviar la solicitud para reserva: {str(e)}")

#### REGISTRO DE RESEÑAS ####

JSON_FILE = "DATA_RESENAS.json"

with open(JSON_FILE, "r") as file:
    resena_data = json.load(file)

for resena in resena_data:
    try:
        response = requests.post(f"{API_URL}/api/resenas/", data=resena, headers={"Authorization": f"Token {TOKEN_AUTH}"})
        if response.status_code == 201:
            print(f"Reseña para propiedad {resena['propiedad']} registrada exitosamente.")
        else:
            print(f"Error al registrar reseña para propiedad {resena['propiedad']}: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Error al enviar la solicitud para reseña: {str(e)}")

print("Proceso completado, base de datos con datos de prueba.")