FROM node:alpine
# Create env vars
ARG NODE_ENV=production
ENV PRISMA_ENDPOINT=https://eu1.prisma.sh/anton-lunov/Buddy-app/test
ENV PRISMA_SECRET=buddy-app-graphql-prisma-secret
ENV APP_SECRET=BUDDY-APP-GraphQL-1s-aw3some
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm ci --only=${NODE_ENV}
# Bundle app source
COPY . .
# Start port with server
EXPOSE 4000
CMD [ "npm", "run", "server:prod" ]