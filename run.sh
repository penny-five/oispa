#!/bin/sh
docker-compose down \
&& docker-compose -f docker-compose.yml up --build -d \
&& echo "Oispa up and running. Run \"docker-compose logs -f\" to see logs."
