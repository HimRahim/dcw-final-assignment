FROM node:14-alpine3.14
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install react-scripts -g
COPY ./ app/
RUN npm react-scripts build
FROM nginx:alpine
COPY ./build /app/build/usr/share/nginx.html
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]