### STAGE 1: Build ###
FROM node:19.7.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
# RUN npm i -g @angular/cli

# Install app dependencies:
RUN npm i

COPY . .
RUN npm run 'build:prod'

### STAGE 2: Run ###
FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/* /usr/share/nginx/html

RUN chown -R root:root /usr/share/nginx/html/index.html
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 3080
EXPOSE 27018
