import { AppState } from '../store/store';

export const getInputStatus = (store: AppState) => store.input;

export const getLocationStatus = (store: AppState) => ({
  isValid: store.location.isValid,
  isLoading: store.location.isLoading,
  error: store.location.error,
});

export const getCrewStatus = (store: AppState) => ({
  crew: store.crew.selected,
  isLoading: store.crew.isLoading,
  error: store.crew.error,
  list: store.crew.list,
});
