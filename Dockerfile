FROM node:8
WORKDIR /usr/src/app/
COPY package*.json .babelrc ./
COPY src/ ./src/
RUN npm i && npm run build

FROM mhart/alpine-node:8
WORKDIR /usr/src/app/
COPY --from=0 /usr/src/app .
COPY . .
EXPOSE 8000
CMD [ "npm", "run", "prod" ]