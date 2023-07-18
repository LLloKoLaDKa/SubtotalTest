import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { launchesAPI } from '../services/LaunchesService';
import { rocketsAPI } from '../services/RocketsService';

const rootReducer = combineReducers({
    [launchesAPI.reducerPath]: launchesAPI.reducer,
    [rocketsAPI.reducerPath]: rocketsAPI.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (gDM) => gDM({ serializableCheck: false }).concat(launchesAPI.middleware, rocketsAPI.middleware)
    });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];