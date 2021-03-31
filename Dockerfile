FROM node:15

WORKDIR /usr/src/fashionframe

COPY ./client/build ./client
COPY ./server/build ./build
COPY ./server/package.json ./
COPY ./server/yarn.lock ./

RUN yarn install --ignore-scripts

CMD yarn start