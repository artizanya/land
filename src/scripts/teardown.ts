// -*- coding: utf-8 -*-:

import { db } from '@arangodb';

db._drop(module.context.collectionName('elements'));
db._drop(module.context.collectionName('components'));
db._drop(module.context.collectionName('processes'));

db._drop(module.context.collectionName('componentTypes'));
db._drop(module.context.collectionName('processInputs'));
db._drop(module.context.collectionName('processOutputs'));
