// Hey Emacs, this is -*- coding: utf-8 -*-

type Id = string;
type Value = Id | {};

type Genesis =
  // Internal elements must have one or more associated processes
  // from which they originate.
  'internal' |
  // External elements come from outside Artizanya and do not have
  // an associated process.
  'external';

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
  kind: 'ProcessComponent';
  element: V extends Id ? Id : Component;
  count: number;
}

interface ProcessCurrency<
  V extends Value = {}
> extends ProcessElementCommon<V> {
  kind: 'ProcessCurrency';
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
