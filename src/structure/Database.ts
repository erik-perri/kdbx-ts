import type DeletedObject from './DeletedObject';
import type Group from './Group';
import type Metadata from './Metadata';

type Database = {
  metadata: Metadata;
  rootGroup: Group;
  deletedObjects: DeletedObject[];
};

export default Database;
