![oispa](gh_image.png)

Local beer recommendations for Helsinki, Tampere and Jyväskylä. Uses [Untappd](https://untappd.com) for data.

Frontend is built with Vue.js. Backend is built with Hapi.js.

## Running oispa

**Dependencies**: Docker, Docker Compose, Node.js (>= 7.7.0)

You need to set environment variables `UNTAPPD_CLIENT_ID` and `UNTAPPD_CLIENT_SECRET` or error will be thrown on startup.

To run in production mode:

    sh run-prod.sh

To run in development mode:

    sh run-dev.sh
