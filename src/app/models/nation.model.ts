export interface Nation {
    'ID State': string,
    Population: number,
    State: string,
    Year: string,
    'ID YEAR': number,
    populationStats?: NationYearPopulationStats[]
}

export interface NationYearPopulationStats {
    year: string,
    population: number
}

export interface NationFilter {
    sortBy: string,
    maxPopulation:number,
    stateName:string
}


