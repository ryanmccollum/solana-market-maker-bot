FROM node:20-alpine

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY .env.example ./
COPY src ./src
COPY test ./test

RUN npm install
RUN npm run build

CMD ["npm", "start"]
