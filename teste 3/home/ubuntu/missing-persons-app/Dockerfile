# Dockerfile para aplicação React com Vite
# Usa uma imagem base do Node.js
FROM node:20-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o código fonte
COPY . .

# Constrói a aplicação para produção
RUN npm run build

# Estágio de produção com Nginx
FROM nginx:alpine AS production

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos construídos do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

