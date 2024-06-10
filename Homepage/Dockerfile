FROM node:18.16.0-alpine
WORKDIR /FINAL2/Homepage
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3005
CMD ["node", "index.js"]