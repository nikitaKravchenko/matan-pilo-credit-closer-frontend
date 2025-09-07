FROM node:18

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY ./app/client/package.json ./app/client/yarn.lock* ./app/client/package-lock.json* ./app/client/pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

COPY ./app/client/public ./public
COPY ./app/client/src ./src
COPY ./app/client/.env .

EXPOSE 3000

CMD npm run start
