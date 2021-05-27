import SolutionStore from "../solution/solutionStore";

class RootStore {
    readonly solutionStore: SolutionStore;

    constructor() {
        this.solutionStore = new SolutionStore();
    }

}

export default RootStore;