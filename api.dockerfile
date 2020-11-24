FROM node:14
RUN npm i -g @nestjs/cli
RUN mkdir /app

COPY packages/api/package.json /app
COPY packages/api/package-lock.json /app

WORKDIR /app

RUN NODE_ENV=development npm install
COPY packages/api /app

EXPOSE 5000
CMD ["npm", "start"]



