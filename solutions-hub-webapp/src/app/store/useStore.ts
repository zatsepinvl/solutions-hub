import {createContext, useContext} from "react";
import RootStore from "./RootStore";

const RootStoreContext = createContext<RootStore>(new RootStore());
const useRootStore = () => useContext<RootStore>(RootStoreContext);
const useDemoStore = () => useRootStore().demoStore;

export {
    RootStoreContext,
    useRootStore,
    useDemoStore
}
