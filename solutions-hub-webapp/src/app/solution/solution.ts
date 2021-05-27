import dayjs from "dayjs";

export interface Solution {
    name: string,
    keywords: string[],
    description: string,
    readme: string,
    assets: SolutionAsset[],
    contributors: SolutionContributor[]
}

export interface SolutionAsset {
    name: string,
    updatedAt: dayjs.Dayjs
}

export interface SolutionContributor {
    name: string
}