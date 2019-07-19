// -*- coding: utf-8 -*-

import * as graphqlModule from 'graphql';
import schemaExequtable from './graphql/schema';

const createGraphQLRouter = require('@arangodb/foxx/graphql');

const router = createGraphQLRouter({
  schema: schemaExequtable,
  graphiql: true,
  graphql: graphqlModule,
}).summary('GraphQL Endpoint')
  .description('GraphQL endpoint for the Artizanya Land.');

module.context.use(router);
