# stage1 as builder
FROM node:20.11.1-slim as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /angular-ui && mv ./node_modules ./angular-ui

WORKDIR /angular-ui

COPY . .
ARG CONTEXT='/'
RUN cd src/environments && sed -i "s|"basepath"|"${CONTEXT}"|g" *

# Build the project and copy the files
RUN npm run build

FROM node:20.11.1-slim
ARG CONTEXT='/'

#!/bin/sh
#RUN apk add sudo && addgroup -S lazsa && adduser -S -G root --uid 1001  lazsa
#RUN echo "lazsa ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers.d/lazsa

# Copy from the stahg 1
COPY --from=builder /angular-ui/dist /angular-ui/dist
COPY ./server.js /angular-ui
WORKDIR /angular-ui

# USER lazsa
RUN npm install express
CMD node server.js
