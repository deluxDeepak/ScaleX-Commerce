# app ko 0.0.0.0 pe bind hona chahiye, localhost pe nahi.  --then work mapping

# Vite default localhost pe run karta hai -- localhost:5173
# - Docker ke bahar se access nahi hota.
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
# RUN npm install
RUN npm ci

COPY . .
EXPOSE 5173

CMD [ "npm","run","dev" ]



# Nginix html file serve karta hai 





