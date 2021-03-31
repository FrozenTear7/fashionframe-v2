FROM node:15

WORKDIR /usr/src/fashionframe

COPY ./client/build ./clientBuild
COPY ./server/build .
COPY ./server/package.json .
COPY ./server/yarn.lock .

RUN yarn install --ignore-scripts

CMD yarn start