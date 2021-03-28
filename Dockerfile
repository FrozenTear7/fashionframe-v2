FROM node:15

WORKDIR /usr/src/fashionframe

COPY ./client ./tmp-client
COPY ./server ./tmp-server

RUN cd ./tmp-client
RUN yarn install
RUN yarn build
COPY ./tmp-client/build ./client

RUN cd ../tmp-server
RUN yarn install
RUN yarn build
COPY ./tmp-server/build ./build
RUN cd ..

COPY ./tmp-server/package.json ./
COPY ./tmp-server/yarn.lock ./

RUN rm -rf ./tmp-client
RUN rm -rf ./tmp-server

RUN yarn install --production=true

CMD [ "yarn start" ]