import dayjs from "dayjs";

export interface Solution {
    id: string,
    slug: string,
    name: string,
    keywords: string[],
    description: string,
    readme: string,
    assets: SolutionAsset[],
    contributors: SolutionContributor[],
    updatedAt: dayjs.Dayjs,
    views: number,
    stars: number
}

export interface SolutionAsset {
    name: string,
    updatedAt: dayjs.Dayjs
}

export interface SolutionContributor {
    userId: string,
    name: string
}