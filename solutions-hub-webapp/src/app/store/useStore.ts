import {createContext, useContext} from "react";
import RootStore from "./RootStore";

const RootStoreContext = createContext<RootStore>(new RootStore());
const useRootStore = () => useContext<RootStore>(RootStoreContext);
const useSolutionStore = () => useRootStore().solutionStore;

export {
    RootStoreContext,
    useRootStore,
    useSolutionStore
}
