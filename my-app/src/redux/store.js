import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const isDebug = process.env.NODE_ENV !== "production"
const storage = sessionStorage;
// ==============================|| REDUX TOOLKIT - CONFIG ||============================== //
/**DEFINISCO IL NOME DELL'ATTRIBUTO PRESENTE NELLA SESSIONE */
const configStore = {
    key: "configStore",
    storage,
    debug: isDebug,
    stateReconciler: autoMergeLevel2
};
// ==============================|| REDUX TOOLKIT - REDUCER ||============================== //
const persistedReducer = persistReducer(configStore, authSlice);
// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //
export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    devTools: isDebug
});

export const persistor = persistStore(store);
