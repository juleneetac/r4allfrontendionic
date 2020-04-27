FROM node:latest AS build

WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN ./node_modules/@ionic/cli/bin/ionic build --prod

FROM nginx:latest
COPY --from=build /usr/src/app/www /usr/share/nginx/html
EXPOSE 80

