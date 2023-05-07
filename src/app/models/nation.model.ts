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
    term: string
}
// export interface Nation {
//     _id: string
//     name: string
//     age: number
//     birthDate: Date
// }

// export interface NationFilter {
//     term: string
// }

