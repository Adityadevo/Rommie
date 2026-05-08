# Base image - Node.js environment
FROM node:18-alpine

# Working directory container ke andar
WORKDIR /app

# Pehle package.json copy karo (caching ke liye)
COPY package*.json ./

# Dependencies install karo
RUN npm install --production

# Baaki saara code copy karo
COPY . .

# Port expose karo (apna backend port daalo)
EXPOSE 5000

# App start karo
CMD ["node", "index.js"]