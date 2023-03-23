FROM node:alpine

WORKDIR /APP
COPY package.json .
RUN npm install --omit=dev
COPY . .
COPY . .

CMD ["npm", "start"]