import { combineReducers } from 'redux';
import { RootState } from './state';
import { LocationReducer } from './location';

export { RootState };

export const rootReducer = combineReducers<RootState>({
  locationState: LocationReducer as any
});
