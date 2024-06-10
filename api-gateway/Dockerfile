FROM node:18.16.0-alpine
WORKDIR /FINAL2/api-gateway
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "index.js"]