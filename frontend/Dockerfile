
FROM node:18-alpine AS build_image
WORKDIR /app/react-app

COPY package.json package-lock.json ./
RUN npm install

COPY ./ ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "preview" ]


# # Uso dos imagenes, una para buildear el codigo fuente y la otra para ejecutar la build
# FROM node:18-alpine AS production_image
# WORKDIR /app/react-app

# # copio la build de la primera imagen
# COPY --from=build_image /app/react-app/dist/ /app/react-app/dist/

# COPY package.json .
# COPY vite.config.js .

# RUN npm install --omit=dev

