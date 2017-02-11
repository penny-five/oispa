#!/bin/sh

if [ -z "$1" ]; then echo "Tag not given. Try again by running e.g. \"build.sh 1.0\""; exit 0; fi

(cd frontend && npm install && npm run build && docker build . -t oispa-frontend:$1)
