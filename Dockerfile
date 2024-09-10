FROM node:22.8.0
WORKDIR /app
COPY . /app
RUN npm install
RUN tsc --project server/tsconfig.json
CMD ["node","dist/server/server.js"]