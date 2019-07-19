// Hey Emacs, this is -*- coding: utf-8 -*-

/* eslint no-console: 'off' */

import * as gm from '@arangodb/general-graph';
import { db } from '@arangodb';

const mxt = module.context;

const artizansCollectionName = mxt.collectionName('artizans');
const projectsCollectionName = mxt.collectionName('projects');
const processesCollectionName = mxt.collectionName('processes');
const elementsCollectionName = mxt.collectionName('elements');

const artizanProjectsEdgeCollectionName =
  mxt.collectionName('artizanProjects');

const projectMainProcessEdgeCollectionName =
  mxt.collectionName('projectMainProcess');
const projectProcessesEdgeCollectionName =
  mxt.collectionName('projectProcesses');
const projectElementsEdgeCollectionName =
  mxt.collectionName('projectElements');

const processInputsEdgeCollectionName = mxt.collectionName('processInputs');
const processOutputsEdgeCollectionName = mxt.collectionName('processOutputs');

const artizansGraphName = mxt.collectionName('artizansGraph');
const projectsGraphName = mxt.collectionName('projectsGraph');
const processesGraphName = mxt.collectionName('processesGraph');

type Id = string;
type Value = Id | {};

class Genesis {
  // Internal elements must have one or more associated processes
  // from which they originate.
  static readonly internal = 0;

  // External elements come from outside Artizanya and do not have
  // an associated process.
  static readonly external = 1;
}

// interface Guild {
//   id: GuildKey;
//   name: string;
//   artizanKeys: Artizan[];
//   projectKeys: ProcessKey[];
//   processKeys: ProcessKey[];
// }

interface ArtizanProject<V extends Value = {}> {
  project: V extends Id ? Id : Project<V>;
}

interface Artizan<V extends Value = {}> {
  id: Id;
  knownas: string;
  projects: ArtizanProject<V>[];
}

// interface Part extends Component {
//   // Part location in Vault
// }

// interface Vault {
//   id: VaultKey;
//   partKeys: PartKey[];
// }

interface ProjectProcess<V extends Value = {}> {
  process: V extends Id ? Id : Process<V>;
}

interface ProjectElement<V extends Value = {}> {
  element: V extends Id ? Id : Element;
}

interface Project<V extends Value = {}> {
  id: Id;
  name: string;
  description: string;
  mainProcess: ProjectProcess<V>;
  processes: ProjectProcess<V>[];
  elements: ProjectElement<V>[];
}

interface ElementCommon {
  kind: string;
  id: Id;
  genesis: Genesis;
  // origin: string;
  // alternatives: Element[];
}

interface Component extends ElementCommon {
  kind: 'Component';
  name: string;
  description: string;
}

interface Currency extends ElementCommon {
  kind: 'Currency';

  // GBP, Euro etc.
  // TODO: Currency type should be some kind of enumeration
  type: string;
}

type Element = Component | Currency;

interface ProcessElementCommon<V extends Value = {}> {
  kind: string;
  element: V extends Id ? Id : Element;
}

interface ProcessComponent<
  V extends Value = {}
> extends ProcessElementCommon<V> {
  kind: Component['kind'];
  element: V extends Id ? Id : Component;
  count: number;
}

interface ProcessCurrency<
  V extends Value = {}
> extends ProcessElementCommon<V> {
  kind: Currency['kind'];
  element: V extends Id ? Id : Currency;
  amount: number;
}

type ProcessElement<V extends Value = {}> =
  ProcessComponent<V> |
  ProcessCurrency<V>;

interface Process<V extends Value = {}> {
  id: Id;
  name: string;
  description: string;
  inputs: ProcessElement<V>[];
  outputs: ProcessElement<V>[];
  // tools: any[];
  // skills: any[];
  // alternatives: Process[];
}

const artizanArray: Artizan<Id>[] = [
  {
    id: '0000',
    knownas: 'ramblehead',
    projects: [
      { project: '0000' },
    ],
  },
];

const projectArray: Project<Id>[] = [
  {
    id: '0000',
    name: 'Hta3D Pritner',
    description: 'Part-less 3D Pritner Kit',
    mainProcess: { process: '0000' },
    processes: [
      { process: '0000' },
      { process: '0001' },
      { process: '0002' },
      { process: '0003' },
      { process: '0004' },
    ],
    elements: [
      { element: '0000' },
      { element: '0001' },
      { element: '0002' },
      { element: '0003' },
      { element: '0004' },
      { element: '0005' },
      { element: '0006' },
      { element: '0007' },
      { element: '0008' },
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

// /b/{ Bootstrap artizans collection and related edges

if(!db._collection(artizansCollectionName)) {
  const artizans = db._createDocumentCollection(artizansCollectionName);
  artizanArray.forEach((artizan: Artizan<Id>): void => {
    const { id, projects, ...rest } = artizan;
    artizans.save({ _key: id, ...rest });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${artizansCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(artizanProjectsEdgeCollectionName)) {
  const artizanProjects =
    db._createEdgeCollection(artizanProjectsEdgeCollectionName);

  artizanArray.forEach((artizan: Artizan<Id>): void => {
    artizan.projects.forEach((artizanProject: ArtizanProject<Id>): void => {
      const { project: projectId, ...rest } = artizanProject;
      artizanProjects.save(
        `${elementsCollectionName}/${artizan.id}`,
        `${projectsCollectionName}/${projectId}`,
        { ...rest },
      );
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${artizanProjectsEdgeCollectionName} already exists. \
Leaving it untouched.`,
);

// /b/} Bootstrap artizans collection and related edges

// /b/{ Bootstrap projects collection and related edges

if(!db._collection(projectsCollectionName)) {
  const projects = db._createDocumentCollection(projectsCollectionName);
  projectArray.forEach((project: Project<Id>): void => {
    const { id, mainProcess, processes, elements, ...rest } = project;
    projects.save({ _key: id, ...rest });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${projectsCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(projectMainProcessEdgeCollectionName)) {
  const projectMainProcess =
    db._createEdgeCollection(projectMainProcessEdgeCollectionName);

  projectArray.forEach((project: Project<Id>): void => {
    const { process: mainProcessId, ...rest } = project.mainProcess;
    projectMainProcess.save(
      `${projectsCollectionName}/${project.id}`,
      `${processesCollectionName}/${mainProcessId}`,
      { ...rest },
    );
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${projectMainProcessEdgeCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(projectProcessesEdgeCollectionName)) {
  const projectProcesses =
    db._createEdgeCollection(projectProcessesEdgeCollectionName);

  projectArray.forEach((project: Project<Id>): void => {
    project.processes.forEach((process: ProjectProcess<Id>): void => {
      const { process: processId, ...rest } = process;
      projectProcesses.save(
        `${projectsCollectionName}/${project.id}`,
        `${processesCollectionName}/${processId}`,
        { ...rest },
      );
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${projectProcessesEdgeCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(projectElementsEdgeCollectionName)) {
  const projectElements =
    db._createEdgeCollection(projectElementsEdgeCollectionName);

  projectArray.forEach((project: Project<Id>): void => {
    project.elements.forEach((element: ProjectElement<Id>): void => {
      const { element: elementId, ...rest } = element;
      projectElements.save(
        `${projectsCollectionName}/${project.id}`,
        `${elementsCollectionName}/${elementId}`,
        { ...rest },
      );
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${projectElementsEdgeCollectionName} already exists. \
Leaving it untouched.`,
);

// /b/} Bootstrap projects collection and related edges

// /b/{ Bootstrap processes collection and related edges

if(!db._collection(processesCollectionName)) {
  const processes = db._createDocumentCollection(processesCollectionName);
  processArray.forEach((process: Process): void => {
    const { id, inputs, outputs, ...rest } = process;
    processes.save({ _key: id, ...rest });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${processesCollectionName} already exists. \
Leaving it untouched.`,
);

if(!db._collection(processInputsEdgeCollectionName)) {
  const processInputs =
    db._createEdgeCollection(processInputsEdgeCollectionName);

  processArray.forEach((process: Process<Id>): void => {
    process.inputs.forEach((processElement: ProcessElement<Id>): void => {
      const { element: elementId, ...rest } = processElement;
      processInputs.save(
        `${elementsCollectionName}/${elementId}`,
        `${processesCollectionName}/${process.id}`,
        { ...rest },
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
    process.outputs.forEach((processElement: ProcessElement<Id>): void => {
      const { element: elementId, ...rest } = processElement;
      processOutputs.save(
        `${processesCollectionName}/${process.id}`,
        `${elementsCollectionName}/${elementId}`,
        { ...rest },
      );
    });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${processOutputsEdgeCollectionName} already exists. \
Leaving it untouched.`,
);

// /b/} Bootstrap processes collection and related edges

// /b/{ Bootstrap elements collection and related edges

if(!db._collection(elementsCollectionName)) {
  const elementsCollection =
    db._createDocumentCollection(elementsCollectionName);
  elementArray.forEach((element: Element): void => {
    const { id, ...rest } = element;
    elementsCollection.save({ _key: id, ...rest });
  });
}
else if(mxt.isProduction) console.warn(
  `collection ${elementsCollectionName} already exists. \
Leaving it untouched.`,
);

// /b/} Bootstrap elements collection and related edges

// /b/{ Bootstrap artizansGraph

if(!gm._exists(artizansGraphName)) {
  const artizanProjectsRelation = gm._relation(
    artizanProjectsEdgeCollectionName,
    artizansCollectionName,
    projectsCollectionName,
  );

  const artizanEdgeDefinitions = gm._edgeDefinitions(
    artizanProjectsRelation,
  );

  gm._create(artizansGraphName, artizanEdgeDefinitions);
}
else if(mxt.isProduction) console.warn(
  `Graph ${artizansGraphName} already exists. Leaving it untouched.`,
);

// /b/} Bootstrap artizansGraph

// /b/{ Bootstrap projectsGraph

if(!gm._exists(projectsGraphName)) {
  const projectMainProcessRelation = gm._relation(
    projectMainProcessEdgeCollectionName,
    projectsCollectionName,
    processesCollectionName,
  );

  const projectProcessesRelation = gm._relation(
    projectProcessesEdgeCollectionName,
    projectsCollectionName,
    processesCollectionName,
  );

  const projectElementsRelation = gm._relation(
    projectElementsEdgeCollectionName,
    projectsCollectionName,
    elementsCollectionName,
  );

  const projectEdgeDefinitions = gm._edgeDefinitions(
    projectMainProcessRelation,
    projectProcessesRelation,
    projectElementsRelation,
  );

  gm._create(projectsGraphName, projectEdgeDefinitions);
}
else if(mxt.isProduction) console.warn(
  `Graph ${projectsGraphName} already exists. Leaving it untouched.`,
);

// /b/} Bootstrap projectsGraphName

// /b/{ Bootstrap processesGraph

if(!gm._exists(processesGraphName)) {
  const processInputsRelation = gm._relation(
    processInputsEdgeCollectionName,
    elementsCollectionName,
    processesCollectionName,
  );

  const processOutputsRelation = gm._relation(
    processOutputsEdgeCollectionName,
    processesCollectionName,
    elementsCollectionName,
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

// /b/} Bootstrap processesGraph
