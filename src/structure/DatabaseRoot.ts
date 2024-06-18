import type DeletedObject from './DeletedObject';
import type Group from './Group';

type DatabaseRoot = {
  group: Group;
  deletedObjects?: DeletedObject[];
};

export default DatabaseRoot;
