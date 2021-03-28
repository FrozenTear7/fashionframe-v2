FROM node:15

WORKDIR /usr/src/server

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production=true

RUN git clone -b master https://${CLONE_TOKEN}:x-oauth-basic@github.com/FrozenTear7/fashionframe-frontend.git /usr/src/client
RUN cd /usr/src/client
RUN yarn install --production=true && yarn build
RUN cp -R ./build /usr/src/server/client
RUN cd /usr/src/server
RUN rm -rf /usr/src/client

COPY . .

RUN yarn tsc

CMD [ "yarn start" ]