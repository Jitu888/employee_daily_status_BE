FROM node:22-alpine

WORKDIR /employee_daily_status_BE

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm","start"]