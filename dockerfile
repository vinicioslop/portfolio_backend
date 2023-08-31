# Use uma imagem de base do Node.js (escolha uma versão adequada para o seu projeto)
FROM node:18

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Compile o TypeScript (se necessário)
RUN npm run build

# Comando para iniciar o aplicativo quando o contêiner for executado
CMD [ "node", "dist/server.js" ]