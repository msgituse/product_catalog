# Use Node.js 22 as the base image
FROM node:22-alpine

RUN apk add --no-cache libc6-compat
# Set the working directory inside the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json (or yarn.lock) files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]