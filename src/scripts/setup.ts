// Hey Emacs, this is -*- coding: utf-8 -*-

/* eslint no-console: 'off' */

import * as gm from '@arangodb/general-graph';
import { db } from '@arangodb';

class Genesis {
  // Internal elements must have one or more associated processes
  // from which they originate.
  static readonly internal = 0;

  // External elements come from outside Artizanya and do not have
  // an associated process.
  static readonly external = 1;
}

const mxt = module.context;

const artizansCollectionName = mxt.collectionName('artizans');
const projectsCollectionName = mxt.collectionName('projects');
const processesCollectionName = mxt.collectionName('processes');
const elementsCollectionName = mxt.collectionName('elements');

const artizanProcessesEdgeCollectionName =
  mxt.collectionName('artizanProcesses');

const processInputsEdgeCollectionName = mxt.collectionName('processInputs');
const processOutputsEdgeCollectionName = mxt.collectionName('processOutputs');

const processesGraphName = mxt.collectionName('processesGraph');

type Id = string;
type Value = Id | {};

// interface Guild {
//   id: GuildKey;
//   name: string;
//   artizanKeys: Artizan[];
//   projectKeys: ProcessKey[];
//   processKeys: ProcessKey[];
// }

interface Artizan<V extends Value = {}> {
  id: Id;
  knownas: string;
  projects: V extends Id ? Id[] : Project[];
}

// interface Part extends Component {
//   // Part location in Vault
// }

// interface Vault {
//   id: VaultKey;
//   partKeys: PartKey[];
// }

interface Project<V extends Value = {}> {
  id: Id;
  name: string;
  description: string;
  mainProcessId: Id;
  processes: V extends Id ? Id[] : Process[];
  elements: V extends Id ? Id[] : Element[];
}

interface Piece {
  kind: string;
  id: Id;
  genesis: Genesis;
  // origin: string;
  // alternatives: Element[];
}

interface Component extends Piece {
  kind: 'Component';
  name: string;
  description: string;
}

interface Currency extends Piece {
  kind: 'Currency';

  // GBP, Euro etc.
  // TODO: Currency type should be some kind of enumeration
  type: string;
}

type Element = Component | Currency;

interface PieceIO<V extends Value = {}> {
  kind: string;
  element: V extends Id ? Id : Element;
}

interface ComponentIO<V extends Value = {}> extends PieceIO<V> {
  kind: Component['kind'];
  element: V extends Id ? Id : Component;
  count: number;
}

interface CurrencyIO<V extends Value = {}> extends PieceIO<V> {
  kind: Currency['kind'];
  element: V extends Id ? Id : Currency;
  amount: number;
}

type ElementIO<V extends Value = {}> = ComponentIO<V> | CurrencyIO<V>;

interface Process<V extends Value = {}> {
  id: Id;
  name: string;
  description: string;
  inputs: ElementIO<V>[];
  outputs: ElementIO<V>[];
  // tools: any[];
  // skills: any[];
  // alternatives: Process[];
}

const artizanArray: Artizan<Id>[] = [
  {
    id: '0000',
    knownas: 'ramblehead',
    projects: ['0000'],
  },
];

const projectArray: Project<Id>[] = [
  {
    id: '0000',
    name: 'Hta3D Pritner',
    description: 'Part-less 3D Pritner Kit',
    mainProcessId: '0000',
    processes: ['0000', '0001', '0002', '0003', '0004'],
    elements: [
      '0000', '0001', '0002', '0003', '0004',
      '0005', '0006', '0007', '0008',
    ],
  },
];

const elementArray: Element[] = [
  {
    kind: 'Component',
    id: '0000',
    genesis: Genesis.internal,
    name: '17HS4401',
    description: 'Bipolar Stepper Motor',
    // origin: 'MotionKing (China) Motor Industry',
    // alternatives: [],
  },
  {
    kind: 'Component',
    id: '0001',
    genesis: Genesis.external,
    name: '3D076',
    description: 'GT2 20T Belt Pulley',
    // origin: 'WODE',
    // alternatives: [],
  },
  {
    kind: 'Component',
    id: '0002',
    genesis: Genesis.external,
    name: 'M3 30mm Cap Screw',
    description: 'M3 30mm Cap Screw',
    // origin: '',
    // alternatives: [],
  },
  {
    kind: 'Component',
    id: '0003',
    genesis: Genesis.external,
    name: 'M3 12mm Cap Screw',
    description: 'M3 12mm Cap Screw',
    // origin: '',
    // alternatives: [],
  },
  {
    kind: 'Component',
    id: '0004',
    genesis: Genesis.external,
    name: 'M3 Self Locking Nut',
    description: 'M3 Self Locking Nut',
    // origin: '',
    // alternatives: [],
  },
  {
    kind: 'Component',
    id: '0005',
    genesis: Genesis.external,
    name: 'LM8UU',
    description: '8mm Linear Ball Bearing',
    // origin: '',
    // alternatives: [],
  },
  {
    kind: 'Component',
    id: '0006',
    genesis: Genesis.external,
    name: 'X Motor Printed Part, Leadscrews',
    description: '',
    // origin: 'HTA3D',
    // alternatives: [],
  },
  {
    kind: 'Component',
    id: '0007',
    genesis: Genesis.external,
    name: 'Xmotor Assembly, Leadscrews',
    description: '',
    // origin: 'HTA3D',
    // alternatives: [],
  },
  {
    kind: 'Currency',
    id: '0008',
    type: 'GBP',
    genesis: Genesis.external,
    // origin: 'The UK',
    // alternatives: [],
  },
];

const processArray: Process<Id>[] = [
  {
    id: '0000',
    name: 'Xmotor Assembly, Leadscrews',
    description: '',
    outputs: [
      {
        kind: 'Component',
        element: '0007',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'Component',
        element: '0000',
        count: 1,
      },
      {
        kind: 'Component',
        element: '0001',
        count: 1,
      },
      {
        kind: 'Component',
        element: '0002',
        count: 1,
      },
      {
        kind: 'Component',
        element: '0003',
        count: 1,
      },
      {
        kind: 'Component',
        element: '0004',
        count: 1,
      },
      {
        kind: 'Component',
        element: '0005',
        count: 1,
      },
      {
        kind: 'Component',
        element: '0006',
        count: 1,
      },
    ],
  },
  {
    id: '0001',
    name: 'Stepper Motor 17HS4401 Purchase',
    description: '',
    outputs: [
      {
        kind: 'Component',
        element: '0000',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'Currency',
        element: '0008',
        amount: 1,
      },
    ],
  },
  {
    id: '0002',
    name: 'Belt Pulley Purchase',
    description: '',
    outputs: [
      {
        kind: 'Component',
        element: '0001',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'Currency',
        element: '0008',
        amount: 1,
      },
    ],
  },
  {
    id: '0003',
    name: 'M3 30mm Cap Screw Purchase',
    description: '',
    outputs: [
      {
        kind: 'Component',
        element: '0002',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'Currency',
        element: '0008',
        amount: 1,
      },
    ],
  },
  {
    id: '0004',
    name: 'M3 12mm Cap Screw Purchase',
    description: '',
    outputs: [
      {
        kind: 'Component',
        element: '0003',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'Currency',
        element: '0008',
        amount: 1,
      },
    ],
  },
];

// let categories = [{
//   category: 'Electronic',
//   children: [{
//     category: 'ADC',
//     description: 'Analogue-to-Digital Converters',
//   }, {
//     category: 'DAC',
//     description: 'Digital-to-Analogue Converters',
//   }]
// }, {
//   category: 'Electric Motors',
//   description: 'Electric Motors, Motor Controllers & Peripherals',
//   children: [{
//     category: 'Stepper Motors',
//     description: '',
//     children: [{
//       element: '0001'
//     }]
//   }]
// }];

// class ComponentGenesis {
//   static readonly NATIVE  = 0;
//   static readonly FOREIGN = 1;
//   static readonly NATURAL = 2;
// }

// class ComponentRole {
//   static readonly PART       = 0;
//   static readonly CONSUMABLE = 1;
//   static readonly INSTRUMENT = 2;
//   static readonly BYPRODUCT  = 3;
//   static readonly PRODUCT    = 4;
// }

if(!db._collection(artizansCollectionName)) {
  const artizans = db._createDocumentCollection(artizansCollectionName);
  artizanArray.forEach((artizan: Artizan<Id>): void => {
    artizans.save({
      _key: artizan.id,
      knownas: artizan.knownas,
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${artizansCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(projectsCollectionName)) {
  const projects = db._createDocumentCollection(projectsCollectionName);
  projectArray.forEach((project: Project<Id>): void => {
    projects.save({
      _key: project.id,
      name: project.name,
      description: project.description,
      mainProcessId: project.mainProcessId,
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${projectsCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(processesCollectionName)) {
  const processes = db._createDocumentCollection(processesCollectionName);
  processArray.forEach((process: Process): void => {
    processes.save({
      _key: process.id,
      name: process.name,
      description: process.description,
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${processesCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(elementsCollectionName)) {
  const elements = db._createDocumentCollection(elementsCollectionName);
  elementArray.forEach((element: Element): void => {
    const { id, ...props } = element;
    elements.save({ _key: id, ...props });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${elementsCollectionName} already exists. \
Leaving it untouched.`,
);

// if(!db._collection(componentTypesEdgeCollectionName)) {
//   const componentTypes =
//     db._createEdgeCollection(componentTypesEdgeCollectionName);

//   componentArray.forEach(component => {
//     componentTypes.save(
//       componentsCollectionName + '/' + component.id,
//       component.element,
//       {});
//   });
// }
// else if(mxt.isProduction) {
//   console.warn(`collection ${componentTypesEdgeCollectionName} \
// already exists. Leaving it untouched.`);
// }

if(!db._collection(processInputsEdgeCollectionName)) {
  const processInputs =
    db._createEdgeCollection(processInputsEdgeCollectionName);

  processArray.forEach((process: Process<Id>): void => {
    process.inputs.forEach((elementIO: ElementIO<Id>): void => {
      const { element: elementId, ...props } = elementIO;
      processInputs.save(
        `${elementsCollectionName}/${elementId}`,
        `${processesCollectionName}/${process.id}`,
        { ...props },
      );
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${processInputsEdgeCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(processOutputsEdgeCollectionName)) {
  const processOutputs =
    db._createEdgeCollection(processOutputsEdgeCollectionName);

  processArray.forEach((process: Process<Id>): void => {
    process.outputs.forEach((elementIO: ElementIO<Id>): void => {
      const { element: elementId, ...props } = elementIO;
      processOutputs.save(
        `${processesCollectionName}/${process.id}`,
        `${elementsCollectionName}/${elementId}`,
        { ...props },
      );
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${processOutputsEdgeCollectionName} already exists. \
Leaving it untouched.`,
);

if(!gm._exists(processesGraphName)) {
  const processInputsRelation = gm._relation(
    processInputsEdgeCollectionName,
    componentsCollectionName,
    processesCollectionName,
  );

  const processOutputsRelation = gm._relation(
    processOutputsEdgeCollectionName,
    processesCollectionName,
    componentsCollectionName,
  );

  const processEdgeDefinitions = gm._edgeDefinitions(
    processInputsRelation,
    processOutputsRelation,
  );

  gm._create(processesGraphName, processEdgeDefinitions);
}
else if(mxt.isProduction) console.warn(
  `Graph ${processesGraphName} already exists. Leaving it untouched.`,
);

if(!db._collection(artizanProcessesEdgeCollectionName)) {
  const artizanProcesses =
    db._createEdgeCollection(artizanProcessesEdgeCollectionName);

  artizanArray.forEach((artizan: Artizan): void => {
    artizan.processKeys.forEach((processKey: ProcessKey): void => {
      artizanProcesses.save(
        `${artizansCollectionName}/${artizan.id}`,
        `${processesCollectionName}/${processKey}`,
        {},
      );
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${artizanProcessesEdgeCollectionName} already exists. \
Leaving it untouched.`,
);

// if(!db._collection(processesCollectionName)) {
//   const processes = db._createDocumentCollection(processesCollectionName);
//   processArray.forEach((process: Process) => {
//     processes.save(process);
//   });
// }
// else if(mxt.isProduction) {
//   console.warn(`collection ${processesCollectionName} \
// already exists. Leaving it untouched.`);
// }

// const processesInputsCollectionName =
//   mxt.collectionName('componentTypes');

// if(!db._collection(processesInputsCollectionName)) {
//   const componentTypes =
//     db._createEdgeCollection(processesInputsCollectionName);

//   [
//     ['0000', '0000'],
//     ['0001', '0000'],
//     ['0002', '0000'],
//     ['0003', '0000'],
//     ['0004', '0000'],
//     ['0005', '0000'],
//     ['0006', '0000'],
//   ].forEach(pair => {
//     componentTypes.save(
//       elementsCollectionName + '/' + pair[0],
//       processesInputsCollectionName + '/' + pair[1],
//       {}
//     );
//   });

//   componentTypes.save(
//     elementsCollectionName + '/0000',
//     processesInputsCollectionName + '/0000',
//     {}
//   );

// }
// else if(mxt.isProduction) {
//   console.warn(`collection ${processesInputsCollectionName} \
// already exists. Leaving it untouched.`);
// }
