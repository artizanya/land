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

type Key = string;

// interface Guild {
//   _key: GuildKey;
//   name: string;
//   artizanKeys: Artizan[];
//   projectKeys: ProcessKey[];
//   processKeys: ProcessKey[];
// }

interface Artizan {
  _key: Key;
  knownas: string;
  projectKeys: Key[];
}

// interface Part extends Component {
//   // Part location in Vault
// }

// interface Vault {
//   _key: VaultKey;
//   partKeys: PartKey[];
// }

interface Project {
  _key: Key;
  name: string;
  description: string;
  mainProcessKey: Key;
  processKeys: Key[];
  elementKeys: Key[];
}

interface Piece {
  kind: string;
  _key: Key;
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

interface PieceIO {
  kind: string;
  elementKey: Key;
}

interface ComponentIO extends PieceIO {
  kind: 'ComponentIO';
  count: number;
}

interface CurrencyIO extends PieceIO {
  kind: 'CurrencyIO';
  amount: number;
}

type ElementIO = ComponentIO | CurrencyIO;

interface Process {
  _key: Key;
  name: string;
  description: string;
  inputs: ElementIO[];
  outputs: ElementIO[];
  // tools: any[];
  // skills: any[];
  // alternatives: Process[];
}

const artizanArray: Artizan[] = [
  {
    _key: '0000',
    knownas: 'ramblehead',
    projectKeys: ['0000'],
  },
];

const projectArray: Project[] = [
  {
    _key: '0000',
    name: 'Hta3D Pritner',
    description: 'Part-less 3D Pritner Kit',
    mainProcessKey: '0000',
    processKeys: ['0000', '0001', '0002', '0003', '0004'],
    elementKeys: [
      '0000', '0001', '0002', '0003', '0004',
      '0005', '0006', '0007', '0008',
    ],
  },
];

const elementArray: Element[] = [
  {
    kind: 'Component',
    _key: '0000',
    genesis: Genesis.internal,
    name: '17HS4401',
    description: 'Bipolar Stepper Motor',
    // origin: 'MotionKing (China) Motor Industry',
    // alternatives: [],
  },
  {
    kind: 'Component',
    _key: '0001',
    genesis: Genesis.external,
    name: '3D076',
    description: 'GT2 20T Belt Pulley',
    // origin: 'WODE',
    // alternatives: [],
  },
  {
    kind: 'Component',
    _key: '0002',
    genesis: Genesis.external,
    name: 'M3 30mm Cap Screw',
    description: 'M3 30mm Cap Screw',
    // origin: '',
    // alternatives: [],
  },
  {
    kind: 'Component',
    _key: '0003',
    genesis: Genesis.external,
    name: 'M3 12mm Cap Screw',
    description: 'M3 12mm Cap Screw',
    // origin: '',
    // alternatives: [],
  },
  {
    kind: 'Component',
    _key: '0004',
    genesis: Genesis.external,
    name: 'M3 Self Locking Nut',
    description: 'M3 Self Locking Nut',
    // origin: '',
    // alternatives: [],
  },
  {
    kind: 'Component',
    _key: '0005',
    genesis: Genesis.external,
    name: 'LM8UU',
    description: '8mm Linear Ball Bearing',
    // origin: '',
    // alternatives: [],
  },
  {
    kind: 'Component',
    _key: '0006',
    genesis: Genesis.external,
    name: 'X Motor Printed Part, Leadscrews',
    description: '',
    // origin: 'HTA3D',
    // alternatives: [],
  },
  {
    kind: 'Component',
    _key: '0007',
    genesis: Genesis.external,
    name: 'Xmotor Assembly, Leadscrews',
    description: '',
    // origin: 'HTA3D',
    // alternatives: [],
  },
  {
    kind: 'Currency',
    _key: '0008',
    type: 'GBP',
    genesis: Genesis.external,
    // origin: 'The UK',
    // alternatives: [],
  },
];

const processArray: Process[] = [
  {
    _key: '0000',
    name: 'Xmotor Assembly, Leadscrews',
    description: '',
    outputs: [
      {
        kind: 'ComponentIO',
        elementKey: '0007',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'ComponentIO',
        elementKey: '0000',
        count: 1,
      },
      {
        kind: 'ComponentIO',
        elementKey: '0001',
        count: 1,
      },
      {
        kind: 'ComponentIO',
        elementKey: '0002',
        count: 1,
      },
      {
        kind: 'ComponentIO',
        elementKey: '0003',
        count: 1,
      },
      {
        kind: 'ComponentIO',
        elementKey: '0004',
        count: 1,
      },
      {
        kind: 'ComponentIO',
        elementKey: '0005',
        count: 1,
      },
      {
        kind: 'ComponentIO',
        elementKey: '0006',
        count: 1,
      },
    ],
  },
  {
    _key: '0001',
    name: 'Stepper Motor 17HS4401 Purchase',
    description: '',
    outputs: [
      {
        kind: 'ComponentIO',
        elementKey: '0000',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'CurrencyIO',
        elementKey: '0008',
        amount: 1,
      },
    ],
  },
  {
    _key: '0002',
    name: 'Belt Pulley Purchase',
    description: '',
    outputs: [
      {
        kind: 'ComponentIO',
        elementKey: '0001',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'CurrencyIO',
        elementKey: '0008',
        amount: 1,
      },
    ],
  },
  {
    _key: '0003',
    name: 'M3 30mm Cap Screw Purchase',
    description: '',
    outputs: [
      {
        kind: 'ComponentIO',
        elementKey: '0002',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'CurrencyIO',
        elementKey: '0008',
        amount: 1,
      },
    ],
  },
  {
    _key: '0004',
    name: 'M3 12mm Cap Screw Purchase',
    description: '',
    outputs: [
      {
        kind: 'ComponentIO',
        elementKey: '0003',
        count: 1,
      },
    ],
    inputs: [
      {
        kind: 'CurrencyIO',
        elementKey: '0008',
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
  artizanArray.forEach((artizan: Artizan): void => {
    artizans.save({
      _key: artizan._key,
      knownas: artizan.knownas,
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${artizansCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(processesCollectionName)) {
  const processes = db._createDocumentCollection(processesCollectionName);
  processArray.forEach((process: Process): void => {
    processes.save({
      _key: process._key,
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
    elements.save(element);
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${elementsCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(componentsCollectionName)) {
  const components = db._createDocumentCollection(componentsCollectionName);
  componentArray.forEach((component: Component): void => {
    components.save(component);
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${componentsCollectionName} already exists. \
Leaving it untouched.`,
);

// if(!db._collection(componentTypesEdgeCollectionName)) {
//   const componentTypes =
//     db._createEdgeCollection(componentTypesEdgeCollectionName);

//   componentArray.forEach(component => {
//     componentTypes.save(
//       componentsCollectionName + '/' + component._key,
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

  processArray.forEach((process: Process): void => {
    process.inputKeys.forEach((componentKey: ComponentKey): void => {
      processInputs.save(
        `${componentsCollectionName}/${componentKey}`,
        `${processesCollectionName}/${process._key}`,
        {},
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

  processArray.forEach((process: Process): void => {
    process.outputKeys.forEach((componentKey: ComponentKey): void => {
      processOutputs.save(
        `${processesCollectionName}/${process._key}`,
        `${componentsCollectionName}/${componentKey}`,
        {},
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
        `${artizansCollectionName}/${artizan._key}`,
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
