FROM --platform=linux/amd64 node:20.9.0
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install --platform=linux --arch=x64 sharp
COPY . .
RUN rm .env
RUN mv .env.prod .env
EXPOSE 3080
RUN chown -R node:node /usr/src/app
RUN chmod -R 777 /usr/src/app/MediaCollection
USER node
CMD ["node", "dist/main.js"]
