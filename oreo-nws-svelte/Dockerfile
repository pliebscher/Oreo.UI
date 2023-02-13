# In svelte.config.js, update "adapter-auto" to "adapter-node"
# See: https://github.com/sveltejs/kit/tree/master/packages/adapter-node
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

ENTRYPOINT [ "node", "build" ]