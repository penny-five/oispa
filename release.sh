#!/bin/sh

if [[ $(git diff) ]]; then
  echo "You have uncommitted files. Commit all changes and try again."
  exit 0;
fi

if [ -z "$1" ]; then
  echo "Tag not given. Try again by running e.g. \"build.sh 1.0.0\"";
  exit 0;
fi

if ! [[ $1 =~ ^[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}$ ]]; then
  echo "Invalid tag. Tag must follow semantic versioning (for example 1.2.3)"
  exit 0;
fi

(cd frontend && yarn version --no-git-tag-version --new-version $1)
# (cd frontend && yarn install --production --pure-lockfile && yarn run build && docker build . -t oispa-frontend:$1 --no-cache)
(cd backend && yarn version --no-git-tag-version --new-version $1)
# (cd backend && docker build . -t oispa-backend:$1 --no-cache)
git add -u && git commit -m "version $1 :tada:" && git tag -a v$1 -m "version $1"

echo "Release ready. To publish changes run \"git push\" and \"git push --tags\""
