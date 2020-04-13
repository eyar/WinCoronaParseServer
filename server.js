const express = require('express');
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');
require('dotenv').config(); 

const app = express();

const parseServer = new ParseServer({
  databaseURI: 'mongodb://eyar:a123456@ds145083.mlab.com:45083/wincoronadb',
  appId: '123456',
  masterKey: '123456',
  restAPIKey: '123456',
  serverURL: process.env.SERVER_URL,
  publicServerURL: process.env.SERVER_URL,
  cloud: "./cloud/main.js",
  allowClientClassCreation: false
});

const parseGraphQLServer = new ParseGraphQLServer(
  parseServer,
  {
    graphQLPath: '/graphql',
    playgroundPath: '/playground'
  }
);

app.use('/parse', parseServer.app); // (Optional) Mounts the REST API
parseGraphQLServer.applyGraphQL(app); // Mounts the GraphQL API
parseGraphQLServer.applyPlayground(app); // (Optional) Mounts the GraphQL Playground - do NOT use in Production

var port = process.env.PORT || 1337;
app.listen(port, function() {
  console.log('REST API running on http://localhost:1337/parse');
  console.log('GraphQL API running on http://localhost:1337/graphql');
  console.log('GraphQL Playground running on http://localhost:1337/playground');
});