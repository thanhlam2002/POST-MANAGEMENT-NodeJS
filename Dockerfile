# Use official Node.js image
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy entire project
COPY . .

# Expose Port
EXPOSE 8080

# Start App
CMD ["node", "server.js"]
