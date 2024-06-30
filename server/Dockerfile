FROM node:19.7.0-alpine AS build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install --platform=linux --arch=x64 sharp
COPY . .
EXPOSE 3080
# RUN chown -R node:node /usr/src/app
RUN chmod -R 777 /usr/src/app/media
USER node
CMD ["node", "server.js"]
