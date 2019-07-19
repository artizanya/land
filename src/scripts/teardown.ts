// -*- coding: utf-8 -*-:

import gm from '@arangodb/general-graph';
import { db } from '@arangodb';

const mxt = module.context;

db._drop(mxt.collectionName('artizans'));
db._drop(mxt.collectionName('projects'));
db._drop(mxt.collectionName('processes'));
db._drop(mxt.collectionName('elements'));

db._drop(mxt.collectionName('artizanProjects'));
db._drop(mxt.collectionName('projectMainProcess'));
db._drop(mxt.collectionName('projectProcesses'));
db._drop(mxt.collectionName('projectElements'));
db._drop(mxt.collectionName('processInputs'));
db._drop(mxt.collectionName('processOutputs'));

gm._drop(mxt.collectionName('artizansGraph'));
gm._drop(mxt.collectionName('projectsGraph'));
gm._drop(mxt.collectionName('processesGraph'));
