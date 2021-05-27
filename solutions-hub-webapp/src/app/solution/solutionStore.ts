import {makeAutoObservable} from "mobx";
import {Solution} from "./solution";
import demoSolution from "./demoSolution";

class SolutionStore {
    private _solution: Solution = demoSolution

    constructor() {
        makeAutoObservable(this)
    }

    get solution() {
        return this._solution;
    }

}

export default SolutionStore;