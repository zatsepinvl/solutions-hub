import SolutionStore from "../solution/SolutionStore";

class RootStore {
    readonly solutionStore: SolutionStore;

    constructor() {
        this.solutionStore = new SolutionStore();
    }

}

export default RootStore;