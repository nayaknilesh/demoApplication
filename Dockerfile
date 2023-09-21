#stage1
FROM node:latest as node

WORKDIR /app

COPY  . .

RUN npm install

RUN npm run build

#stage2

FROM nginx:latest

COPY --from=node /app/dist/registration /usr/share/nginx/html
