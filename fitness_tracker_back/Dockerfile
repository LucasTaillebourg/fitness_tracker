# Utilisez une image Node.js comme base
FROM node:14

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances
RUN npm install

# Copiez tous les fichiers source dans le conteneur
COPY . .

# Exposez le port sur lequel votre application écoute
EXPOSE 3000

# Commande pour démarrer votre application
CMD ["node", "app.js"]
