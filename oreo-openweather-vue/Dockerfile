# -----------------------------------------------------------------------------------------
# BUILD	: docker build --force-rm -t {namespace/image name} .
# RUN	: docker run -p 80:80 {namespace/image name}
# -----------------------------------------------------------------------------------------
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf