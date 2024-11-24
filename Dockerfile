FROM node:19-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci

COPY . .

ENV VITE_API_URL https://punttiapi.jessenprojekti.fi

EXPOSE 5173

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist", "-p", "5173"]
