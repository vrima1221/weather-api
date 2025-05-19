FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Set environment variables (override in docker-compose)
ENV NODE_ENV=production

# Expose the port your app listens on
EXPOSE 3000

# Default command
CMD ["node", "src/index.js"]