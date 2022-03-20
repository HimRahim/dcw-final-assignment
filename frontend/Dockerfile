FROM node:14-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY ./ app/
RUN npm run-scripts build
FROM nginx:alpine
COPY ./build /app/build/usr/share/nginx.html
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]