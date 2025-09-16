FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json (se existir)
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production && npm cache clean --force

# Copia o resto dos arquivos da aplicação
COPY . .

# Cria um usuário não-root para executar a aplicação
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

# Muda a propriedade dos arquivos para o usuário nodejs
RUN chown -R nodejs:nodejs /app
USER nodejs
# 
# Expõe a porta que a aplicação vai usar
EXPOSE 3000

# Define variáveis de ambiente
ENV NODE_ENV=production
ENV PORT=3000  

# Comando para executar a aplicação
CMD ["node", "app.js"]