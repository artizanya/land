// Hey Emacs, this is -*- coding: utf-8 -*-

import { db, aql } from '@arangodb';

const mxt = module.context;

// const elementsCollectionName = mxt.collectionName('elements');
// const componentsCollectionName = mxt.collectionName('components');
// const processesCollectionName = mxt.collectionName('processes');
const processesGraphName = mxt.collectionName('processesGraph');

const elements = mxt.collection('elements')!;
const components = mxt.collection('components')!;
const processes = mxt.collection('processes')!;

const resolvers = {
  Item: {
    __resolveType: (obj) => {
      if(obj.collection === 'elements') return 'Element';
      if(obj.collection === 'components') return 'Component';
      return 'Process';
    }
  },

  Element: {
    collection: (obj) => 'elements',
    id: (obj) => obj._key
  },

  Component: {
    collection: (obj) => 'components',
    id: (obj) => obj._key,

    element: (obj) => elements.firstExample({
      _key: obj.elementKey
    }),
  },

  Process: {
    collection: (obj) => 'processes',
    id: (obj) => obj._key,

    inComponents: (obj) => db._query(aql`
      FOR vertex
        IN 1..1
        INBOUND ${obj._id}
        GRAPH ${processesGraphName}
        RETURN DOCUMENT(CONCAT(${components.name()}, "/", vertex._key))
      `).toArray(),

    outComponents: (obj) => db._query(aql`
      FOR vertex
        IN 1..1
        OUTBOUND ${obj._id}
        GRAPH ${processesGraphName}
        RETURN DOCUMENT(CONCAT(${components.name()}, "/", vertex._key))
      `).toArray(),
  },

  Query: {
    element: (obj, args) => elements.firstExample({
      _key: args.id
    }),

    component: (obj, args) => components.firstExample({
      _key: args.id
    }),

    process: (obj, args) => processes.firstExample({
      _key: args.id,
    }),

    item: (obj, args) => {
      const collection = mxt.collection(args.collection);
      if(collection) {
        return {
          ...collection.firstExample({_key: args.id}),
          collection: args.collection
        };
      }
      return null;
    },

    // process: (obj, args) => {
    //   let process = processes.firstExample({
    //     _key: args.id,
    //   });

    //   if(process) {
    //     process.inComponentIds = db._query(aql`
    //       FOR vertex
    //         IN 1..1
    //         INBOUND ${process._id}
    //         GRAPH ${processesGraphName}
    //         RETURN vertex._key
    //     `).toArray();

    //     process.outComponentIds = db._query(aql`
    //       FOR vertex
    //         IN 1..1
    //         OUTBOUND ${process._id}
    //         GRAPH ${processesGraphName}
    //         RETURN vertex._key
    //     `).toArray();
    //   }

    //   return process;
    // }

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
  },

  Mutation: {
    updateElement: (obj, args, context, info) => {
      return true;
    }
  }

};

export default resolvers;
