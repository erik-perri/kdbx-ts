import type DatabaseRoot from './DatabaseRoot';
import type Metadata from './Metadata';

type Database = {
  metadata: Metadata;
  root: DatabaseRoot;
};

export default Database;
