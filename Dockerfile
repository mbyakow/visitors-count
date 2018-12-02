FROM node:8
WORKDIR /usr/src/app/
COPY package*.json ./
RUN npm i
CMD [ "npm", "run", "build" ]

FROM mhart/alpine-node:8
WORKDIR /usr/src/app/
COPY --from=0 /usr/src/app .
COPY . .
EXPOSE 8000
CMD [ "npm", "run", "prod" ]