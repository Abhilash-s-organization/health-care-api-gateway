# health-care-api-gateway

Run:
(optional) npm install express http-proxy-middleware dotenv morgan express-rate-limit
node server.js

want auto-reload during development:
npm install -g nodemon
nodemon server.js

Test with curl or browser:
curl http://localhost:3000/
curl http://localhost:3000/chat/test

Test Gateway with token:

generate token:
node generateToken.js
curl -H "Authorization: Bearer <your-token>" http://localhost:3000/chat/test

Test API Gateway:
Jest + Supertest so we can simulate requests without actually starting a real server in Jenkins.

npm install --save-dev jest supertest

Run tests:
npm test