FROM node:11.12.0-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install --production

CMD ["npm", "start"]
