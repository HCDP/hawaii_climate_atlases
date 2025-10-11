FROM node:22

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

CMD ["npm", "run", "standalone"]