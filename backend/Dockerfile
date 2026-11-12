FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

# Run as the unprivileged user that ships with the Node image
USER node

EXPOSE 5000
CMD ["node", "server.js"]
