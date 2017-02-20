#!/bin/sh

if [ -z "$1" ]; then echo "Tag not given. Try again by running e.g. \"build.sh 1.0\""; exit 0; fi
(cd frontend && yarn version --no-git-tag-version --new-version $1)
(cd frontend && yarn install --production --pure-lockfile && yarn run build && docker build . -t oispa-frontend:$1 --no-cache)
(cd backend && yarn version --no-git-tag-version --new-version $1)
(cd backend && docker build . -t oispa-backend:$1 --no-cache)
