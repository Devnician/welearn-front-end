# stage 1
FROM node:alpine AS welearn-front-end
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=welearn-front-end /app/dist/welearn-front-end /usr/share/nginx/html
EXPOSE 80
