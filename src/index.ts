// -*- coding: utf-8 -*-

const createGraphQLRouter = require('@arangodb/foxx/graphql');

import * as graphqlModule from 'graphql';

import schemaExequtable from './graphql/schema';

const router = createGraphQLRouter({
  schema: schemaExequtable,
  graphiql: true,
  graphql: graphqlModule,
}).summary('GraphQL Endpoint')
  .description('GraphQL endpoint for the Artizanya Land.');

module.context.use(router);
