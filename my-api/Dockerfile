FROM lukechannings/deno:v1.26.2

EXPOSE 7778

WORKDIR /app

COPY . .

RUN deno cache deps.js


CMD [ "run", "--unstable", "--watch", "--allow-net", "--allow-read", "--allow-write", "--allow-env", "--no-check", "--allow-run", "app.js" ]