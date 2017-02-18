#!/bin/sh
docker-compose down \
&& docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --force-recreate -d \
&& echo "Oispa dev environment up and running." \
&& echo "Run \"docker-compose logs -f\" to see logs." \
&& echo "Run \"cd frontend && yarn run dev\" to start webpack dev server."
