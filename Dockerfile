FROM node:15

WORKDIR /usr/src/fashionframe

COPY ./client/build ./clientBuild
COPY ./server/build ./
COPY ./server/package.json ./
COPY ./server/yarn.lock ./
COPY ./server/public ./

RUN yarn install --ignore-scripts

CMD yarn start