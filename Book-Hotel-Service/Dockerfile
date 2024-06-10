FROM node:18.16.0-alpine
WORKDIR /FINAL2/Book-Hotel-Service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3003
CMD ["node", "index.js"]