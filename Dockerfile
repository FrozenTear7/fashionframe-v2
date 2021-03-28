FROM node:15

WORKDIR /usr/src/fashionframe

COPY ./server/package.json ./
COPY ./server/yarn.lock ./

RUN cd ./client
RUN yarn install
RUN yarn build
COPY ./client/build ./client

RUN cd ../server
RUN yarn install
RUN yarn build
COPY ./server/build ./build

CMD [ "yarn start" ]