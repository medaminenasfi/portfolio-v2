FROM node:20-alpine

WORKDIR /app

# Copy configuration files first
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies and build
RUN npm install

# Copy rest of the application
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
