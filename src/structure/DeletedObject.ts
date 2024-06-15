import { type Uuid } from './Uuid';

export type DeletedObject = {
  uuid: Uuid;
  deletionTime: Date;
};

export default DeletedObject;
