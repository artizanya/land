// -*- coding: utf-8 -*-

// declare module '@arangodb';
// declare module '@arangodb/*';

// interface NodeModule {
//   context: any;
// }

declare module '@arangodb/general-graph' {
  function _exists(
    name: string
  ): {
    _id: string;
    _key: string;
    _rev: string;
  } | boolean;
}

// declare namespace ArangoDB {
//   interface Collection<T extends object = any> {
//     name(): string;
//   }
// }
