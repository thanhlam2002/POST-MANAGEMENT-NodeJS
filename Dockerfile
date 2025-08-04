FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

# --- Force Railway Recognize Port ---
ENV PORT=8080
EXPOSE 8080
# -------------------------------------

CMD ["node", "server.js"]

