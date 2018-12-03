// -*- coding: utf-8 -*-:

import { db } from '@arangodb';
import * as gm from '@arangodb/general-graph';

const mxt = module.context;

db._drop(mxt.collectionName('elements'));
db._drop(mxt.collectionName('components'));
db._drop(mxt.collectionName('processes'));

db._drop(mxt.collectionName('componentTypes'));
db._drop(mxt.collectionName('processInputs'));
db._drop(mxt.collectionName('processOutputs'));

gm._drop(mxt.collectionName('processesGraph'));
