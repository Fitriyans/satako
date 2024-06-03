FROM node:18

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ENV MONGO_URI=mongodb+srv://nursaidahfitria:URDxwZbzi0phPpI8@satakodb.8ftgzlo.mongodb.net/Node-API?retryWrites=true&w=majority&appName=satakoDB

ENV PORT=3000

CMD ["npm","run","dev"]
