FROM balenalib/rpi-raspbian

# install required packages, in one command
RUN apt-get update  && \
    apt-get install -y

# install nodejs for rpi
RUN apt-get install -y wget && \
    wget http://node-arm.herokuapp.com/node_latest_armhf.deb && \
    dpkg -i node_latest_armhf.deb && \
    rm node_latest_armhf.deb && \
    apt-get autoremove -y wget
    
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "build"]