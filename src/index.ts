// -*- coding: utf-8 -*-

import graphqlModule from 'graphql';
import createGraphQLRouter from '@arangodb/foxx/graphql';
import schemaExequtable from './graphql/schema';

const router = createGraphQLRouter({
  schema: schemaExequtable,
  graphiql: true,
  graphql: graphqlModule,
});

module.context.use(router);
