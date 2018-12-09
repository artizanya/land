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
  Element: {
    id: (obj) => obj._key
  },

  Component: {
    id: (obj) => obj._key,

    element: (obj) => elements.firstExample({
      _key: obj.elementKey
    }),
  },

  Process: {
    id: (obj) => obj._key,

    inComponents: (obj) => db._query(aql`
      FOR vertex
        IN 1..1
        INBOUND ${obj._id}
        GRAPH ${processesGraphName}
        RETURN DOCUMENT(CONCAT("land_components/", vertex._key))
      `).toArray(),

    outComponents: (obj) => db._query(aql`
      FOR vertex
        IN 1..1
        OUTBOUND ${obj._id}
        GRAPH ${processesGraphName}
        RETURN DOCUMENT(CONCAT("land_components/", vertex._key))
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
  }
};

export default resolvers;
