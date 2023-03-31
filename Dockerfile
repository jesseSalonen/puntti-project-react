FROM arm64v8/node:18-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

EXPOSE 5173

CMD ["npm", "run", "build"]

CMD ["npx", "serve", "dist"]
