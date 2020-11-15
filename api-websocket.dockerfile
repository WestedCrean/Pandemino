FROM node:14

WORKDIR /app
RUN npm i -g @nestjs/cli

COPY packages/streams/package.json /app
COPY packages/streams/package-lock.json /app

RUN npm install
COPY packages/streams /app

EXPOSE 5050
CMD ["npm", "start"]

