#!/bin/sh
docker-compose down \
&& docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d \
&& (cd frontend && yarn run dev) \
&& echo "Oispa dev environment up and running. Run \"docker-compose logs -f\" to see logs."
