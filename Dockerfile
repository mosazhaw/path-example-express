FROM node:24.11.1
WORKDIR /app
COPY . /app
RUN npm ci
RUN npm run build
CMD ["node","dist/server/server.js"]
EXPOSE 10000
