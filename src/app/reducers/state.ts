import { LocationModel } from 'app/models';

export interface RootState {
  locationState?: any;
  router?: any;
}

export namespace RootState {
  export type LocationState = LocationModel;
}
