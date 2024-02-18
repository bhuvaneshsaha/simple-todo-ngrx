import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type AppState = {
  isLoading: boolean;
};

const initialState: AppState = {
  isLoading: false,
};

export const AppStore = signalStore(
  withState(initialState),
  withMethods((store) => ({
    setLoading(isLoading: boolean) {
      patchState(store, (state) => {
        state.isLoading = isLoading;
        return state;
      });
    },
  }))
);
