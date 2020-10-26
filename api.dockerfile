FROM node:14

WORKDIR /app

COPY packages/api/package.json /app
COPY packages/api/package-lock.json /app
RUN npm install
RUN npm install -g nodemon

COPY packages/api /app

EXPOSE 5000

CMD ["npm", "start"]

