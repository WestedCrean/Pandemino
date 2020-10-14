FROM node:14

WORKDIR /app

COPY packages/api/package.json /app
COPY packages/api/package-lock.json /app
RUN npm install

COPY packages/api /app

EXPOSE 3000

CMD ["npm", "start"]

