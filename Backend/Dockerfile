# container = Linux environment (Har container ek linux environment hai )
# Host OS (Linux kernel)
#  ├── Container 1 (node + alpine)
#  ├── Container 2 (mongo + debian)
#  ├── Container 3 (nginx + alpine)

# Alpine Linux chalega.
FROM node:20-alpine
# Debian Linux chalega.  --> FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# EXPOSE 3000
EXPOSE 4000

CMD ["node", "src/server.js"]
