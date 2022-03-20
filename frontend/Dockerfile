FROM node:14-alpine3.14
WORKDIR /app
COPY . ./app
RUN yarn
RUN yarn build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx.html
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;" ]