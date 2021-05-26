import {makeAutoObservable} from "mobx";
import {Solution} from "./Solution";
import testSolution from "./testSolution";

class SolutionStore {
    private _solution: Solution = testSolution

    constructor() {
        makeAutoObservable(this)
    }

    get solution() {
        return this._solution;
    }

}

export default SolutionStore;