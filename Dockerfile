FROM node:11
# Create env vars
ENV PRISMA_ENDPOINT=https://eu1.prisma.sh/anton-lunov/Buddy-app/test
ENV PRISMA_SECRET=buddy-app-graphql-prisma-secret
ENV APP_SECRET=BUDDY-APP-GraphQL-1s-aw3some
ENV PORT=4000
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production
# Bundle app source
COPY . .
# Start port with server
EXPOSE ${PORT}
CMD [ "npm", "run", "server:prod" ]