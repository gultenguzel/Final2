FROM node:18.16.0-alpine
WORKDIR  /FINAL2/Hotel-Search-Service
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3006
CMD ["node", "index.js"]