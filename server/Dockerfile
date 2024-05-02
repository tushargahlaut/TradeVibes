FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
ENV PORT = 8080
EXPOSE $PORT
CMD ["node", "dist/index.js"]