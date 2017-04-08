FROM angeloocana/alpine-nodejs-mongodb:0.3

#create app directory
ADD . /code
WORKDIR /code

#install app dependencies
RUN npm install -g ts-node && \
    npm install 
# npm install --no-bin-links

EXPOSE 3000

ENTRYPOINT ["mongod"]
