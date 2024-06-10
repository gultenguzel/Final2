# Temel imaj olarak Node.js'yi kullan
FROM node:18.16.0-alpine

# Çalışma dizinini oluştur ve ayarla
WORKDIR /FINAL2/Hotel-Admin-Service 

# package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Uygulama kaynak kodlarını kopyala
COPY . .

# Public klasörünü oluştur ve ayarla
RUN mkdir -p public

# Portu aç ve uygulamayı başlat
EXPOSE 3004
CMD ["npm", "start"]
