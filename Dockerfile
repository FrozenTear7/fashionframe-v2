FROM node:15

WORKDIR /usr/src/server

RUN npm install --global yarn

COPY package.json ./
COPY yarn.lock ./

RUN yarn install && yarn tsc

RUN git clone -b docker https://${CLONE_TOKEN}:x-oauth-basic@github.com/StackPointCloud/myapp.git /usr/src/client
RUN cd /usr/src/client
RUN yarn install && yarn build
RUN cp -R ./build /usr/src/server/client
RUN cd /usr/src/server
RUN rm -rf /usr/src/client

COPY . .

CMD [ "yarn start" ]