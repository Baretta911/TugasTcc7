FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
ENV NODE_ENV=production
CMD ["node", "index.js"]
