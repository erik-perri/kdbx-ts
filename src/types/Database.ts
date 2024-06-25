import type DatabaseRoot from './database/DatabaseRoot';
import type Metadata from './database/Metadata';

type Database = {
  metadata: Metadata;
  root: DatabaseRoot;
};

export default Database;
