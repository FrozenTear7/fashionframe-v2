FROM node:15

WORKDIR /usr/src/fashionframe

COPY ./client ./tmp-client
COPY ./server ./tmp-server

RUN cd ./tmp-client
RUN yarn install
RUN echo "Client install completed"
RUN yarn build
RUN echo "Client build completed"
COPY ./tmp-client/build ./client

RUN echo "Client done"

RUN cd ./tmp-server
RUN yarn install --ignore-scripts
RUN echo "Server install completed"
RUN yarn build
RUN echo "Server build completed"
COPY ./tmp-server/build ./build
RUN cd ..

RUN echo "Server done"

COPY ./tmp-server/package.json ./
COPY ./tmp-server/yarn.lock ./

RUN rm -rf ./tmp-client
RUN rm -rf ./tmp-server

RUN yarn install --production=true

RUN echo "Server for production ready"

CMD [ "yarn start" ]