FROM node:20-alpine

WORKDIR /app

# Copy all files needed for build
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

# Install dependencies and build
RUN npm install

# Copy remaining application files
COPY . .

# Build the application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
