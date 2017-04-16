FROM node:7.9.0-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install --pure-lockfile

COPY index.js knexfile.js ./
COPY migrations ./migrations
COPY src ./src

EXPOSE 8080

CMD ["yarn", "start"]
