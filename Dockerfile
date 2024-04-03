# Use uma imagem de Node.js
FROM node:20

# Crie o diretório de trabalho
WORKDIR /app

# Copie os arquivos do package.json e package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código-fonte da aplicação
COPY . .

# Compile o código TypeScript
RUN npm run build

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
