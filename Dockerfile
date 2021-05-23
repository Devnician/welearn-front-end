# stage 1
FROM node:alpine AS welearn-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=welearn-build /app/dist/welearn-ui /usr/share/nginx/html
EXPOSE 80
