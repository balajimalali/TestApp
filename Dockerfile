FROM node:alpine

WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/

COPY . .

RUN npm install
RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 8080

CMD npm run dev