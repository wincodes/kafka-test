FROM node:erbium

ARG PORT
ARG APP_DIR

WORKDIR ${APP_DIR}

COPY . ${APP_DIR}

RUN npm install

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]