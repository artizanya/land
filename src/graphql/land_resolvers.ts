// Hey Emacs, this is -*- coding: utf-8 -*-

import { db, aql } from '@arangodb';

const mxt = module.context;

const elements = mxt.collection('elements')!;
const components = mxt.collection('components')!;
const processes = mxt.collection('processes')!;

const resolvers = {
  Element: {
    id: (obj) => obj._key
  },

  Component: {
    id: (obj) => obj._key
  },

  Process: {
    id: (obj) => obj._key
  },

  Query: {
    element: (obj, args) => elements.firstExample({
      _key: args.id
    }),

    component: (obj, args) => components.firstExample({
      _key: args.id
    }),

    process: (obj, args) => processes.firstExample({
      _key: args.id
    }),

    // FOR vertex
    //   IN 1..1
    //   INBOUND "land_processes/0000"
    //   GRAPH "land_processesGraph"
    //   RETURN {
    //     count: vertex.count,
    //     element: DOCUMENT(vertex.element)
    //   }

    // elements: (obj, args, context, info) => {
    //   return db._query(aql`
    //     FOR element IN ${elements}
    //     RETURN element
    //   `);
    // },
  }
};

export default resolvers;
