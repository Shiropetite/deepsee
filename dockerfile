# Étape 1 : Construction du frontend
FROM node:18.9.0-alpine AS build-frontend
RUN npm install -g http-server
WORKDIR /app/deepsee-front
COPY deepsee-front/package*.json ./
RUN npm install
COPY deepsee-front ./
RUN npm run build

# Étape 2 : Construction du backend
FROM node:18 AS build-backend
WORKDIR /app/deepsee-back
COPY deepsee-back/package*.json ./
RUN npm install
COPY deepsee-back ./
RUN npm run build

# Étape 3 : Création de l'image finale
FROM node:18
WORKDIR /usr/src/app

# Copier les fichiers construits
COPY --from=build-frontend /app/deepsee-front/dist /usr/src/app/public
COPY --from=build-backend /app/deepsee-back ./ 

# Installer serve pour servir le frontend
RUN npm install -g serve

# Exposer les ports nécessaires
EXPOSE 8080
EXPOSE 3000

# Démarrer le frontend avec http-server et le backend
CMD ["sh", "-c", "serve -s public -l 8080 & node ./dist/server.js"]

