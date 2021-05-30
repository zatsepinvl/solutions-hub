import DemoStore from "../demo/demoStore";

class RootStore {
    readonly demoStore: DemoStore;

    constructor() {
        this.demoStore = new DemoStore();
    }

}

export default RootStore;