import {makeAutoObservable} from "mobx";
import solutionsHub from "./solutions/solutionsHub";
import javaPdfGenerationSolution from "./solutions/javaPdfGeneration";
import watchOutLicenses from "./solutions/watchoutLicences";

class DemoStore {
    solutions = [
        solutionsHub,
        javaPdfGenerationSolution,
        watchOutLicenses
    ]

    constructor() {
        makeAutoObservable(this)
    }

    getSolutionBySlug(slug: string) {
        const solution = this.solutions.filter(s => s.slug === slug)[0];
        if (!solution) {
            throw new Error(`Solution not found by slug ${slug}`);
        }
        return solution;
    }
}

export default DemoStore;