FROM node:12.4.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers make python && \
  npm install --quiet node-gyp -g &&\
  npm install --quiet && \
  npm install --quiet ts-node -g && \
  # npm run build && \
  apk del native-deps

COPY . ./

EXPOSE 8080

ENTRYPOINT ["ts-node", "./src/app.ts"]