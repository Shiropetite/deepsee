FROM node:18.9.0-alpine AS build-frontend
RUN npm install -g http-server
WORKDIR /app/deepsee-front
COPY deepsee-front/package*.json ./
RUN npm install
COPY deepsee-front ./
RUN npm run build

FROM node:18 AS build-backend
WORKDIR /app/deepsee-back
COPY deepsee-back/package*.json ./
RUN npm install
COPY deepsee-back ./
RUN npm run build

FROM node:18
WORKDIR /usr/src/app
COPY --from=build-frontend /app/deepsee-front/dist /usr/src/app/public
COPY --from=build-backend /app/deepsee-back ./

EXPOSE 8080
EXPOSE 3000

CMD ["node", "./dist/server.js"]
