FROM node:14 as builder

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn --pure-lockfile

COPY . .

RUN yarn build


FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["yarn" ,"run","start:prod"]