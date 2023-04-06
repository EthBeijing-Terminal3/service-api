# Common build stage
FROM node:16.20.0-alpine3.16

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 4000

ENV NODE_ENV production

RUN npm run builds
CMD [ "npm", "run", "start" ]
