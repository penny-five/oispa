from node:7.5.0-alpine

RUN npm install -g yarn@0.19.1

WORKDIR /app

ADD package.json .
ADD yarn.lock .

RUN yarn install --pure-lockfile

COPY index.js knexfile.js ./
COPY migrations ./migrations
COPY src ./src

EXPOSE 8080

CMD ["yarn", "start"]
