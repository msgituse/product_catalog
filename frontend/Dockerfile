# Use Debian-based Node.js image for better compatibility
FROM node:22-slim AS builder

# Set working directory
WORKDIR /app/frontend

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy the application code
COPY . .

# Pass API URL as an argument during build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the Next.js app
RUN npm run build

# Use a smaller image for production
FROM node:22-slim AS runner

WORKDIR /app/frontend

# Copy necessary files from builder
COPY --from=builder /app/frontend/package*.json ./
COPY --from=builder /app/frontend/.next .next
COPY --from=builder /app/frontend/public public
COPY --from=builder /app/frontend/node_modules node_modules

EXPOSE 3000

CMD ["npm", "run", "start"]