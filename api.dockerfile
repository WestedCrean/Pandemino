FROM node:14

WORKDIR /app
RUN npm i -g @nestjs/cli

COPY packages/api/package.json /app
COPY packages/api/package-lock.json /app

RUN npm install
COPY packages/api /app

EXPOSE 5000
CMD ["npm", "start"]

