# Proyecto Final - Infraestructuras Paralelas y Distribuidas

## Descripción

Este proyecto utiliza Docker Compose para desplegar los servicios requeridos localmente. Incluye servicios como el backend, implementado usando Django Rest-Framework, base de datos Postgres, y frontend implementado en React con Vite, permitiendo la comunicación entre backend-base de datos y backend-frontend. Adicionalmente se agrega un servicio Nginx para servir los archivos estáticos y de medios (fotos y videos cargados) que contenga la aplicación.

## Integrantes

Víctor Manuel Hernández - 2259520

Esteban Revelo - 2067507

Nicolas Mauricio Rojas - 2259460

Juan Miguel Posso - 2259610

Jhon Alejandro Martínez - 2259565

## Configuración Inicial

1. Es necesario contar con docker y docker compose instalados
    - [Docker](https://www.docker.com/get-started)
    - [Docker Compose](https://docs.docker.com/compose/install/)

2. Clonar este repositorio en la maquina local y ubicarse en la raíz del proyecto

    ```bash
    git clone https://github.com/vicmaHo/proyecto-infra-local
    cd proyecto-infra-local
    ```

3. Configurar correctamente las variables de entorno en que se encuentran en los archivos **.env** o en el docker-compose file

    **Estas ya vienen configuradas de antemano para el correcto funcionamiento (No es necesario realizar modificaciones)**, pero si se desea realizar algún cambio de puerto de ejecución, configuración de base de datos etc, será necesario revisar que esten en orden dichas variables de entorno.

    Configuración de la base de datos en **docker-compose.yml**

    ```yml
    environment:
      POSTGRES_USER: django_user
      POSTGRES_PASSWORD: 1234ch
      POSTGRES_DB: django_db
    ```

    Configuración de url de ejecución el backend en variables de entorno del frontend especificadas en el archivo **.env**

    ```json
    VITE_API_URL="http://localhost:8000" 
    ```

    Configuración de variables de entorno en el backend especificadas en el archivo **.env**

    ```plain
    MAIL_PASS_COCOON_PROJECT='password'
    MAIL_COCOON_PROJECT='mail@gmail.com'
    # url para el front
    FRONTEND_URL=http://localhost:3000 
    ```

## Instrucciones de ejecución

1. Construir los contenedores con docker compose

    ```bash
    docker compose up
    ````

2. Acceder a los servicios
    - **Frontend**: Disponible en <http://localhost:3000> (si se configuró en el puerto 3000).
    - **Backend**: Disponible en <http://localhost:8000> (si se configuró en el puerto 8000).
    - **Base de Datos**: Disponible en localhost:5433 para conectarse desde herramientas externas.

3. Opcionalmente se encuentra disponible en la carpeta *SCRIPT_DATOS_PRUEBA* un script en python que llenara la BD con algunos datos de prueba para poder comenzar a trabajar con ellos. **Ejecutar el archivo llenar_bd_script.py cuando se este ejecutando el backend**, ya que este funciona realizando peticiones para ingresar los datos, **ademas si se modifico el puerto de ejecución del backend se debe modificar la variable `API_URL` dentro del script.**

    ```bash
    cd SCRIPT_DATOS_PRUEBA # dirigirse a la carpeta
    python llenar_bd_script.py # ejecutar el script para llenar la bd
    ```

## Información Adicional importante

### Documentación de la api

La documentación de la API del backend hecha con OpenAPI (Swagger) se encontrará disponible una vez levantado el servicio, en el endpoint **/api/schema/swagger-ui**

**Documentación completa de la api**: Disponible en <http://localhost:8000/api/schema/swagger-ui/> (si configuró el puerto 8000)
