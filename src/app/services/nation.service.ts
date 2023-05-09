import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, retry, tap, throwError } from 'rxjs';
import { Nation, NationFilter, NationYearPopulationStats } from '../models/nation.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NationService {

  constructor(private http: HttpClient) { }

  private _nationsDb: Nation[] = []

  private _nations$ = new BehaviorSubject<Nation[]>([]);
  public nations$ = this._nations$.asObservable()

  private _mostPopulatedNation$ = new BehaviorSubject<Nation>({ 'ID State': '', State: '', "ID YEAR": 0, Year: '', Population: 0 });
  public mostPopulatedNation$ = this._mostPopulatedNation$.asObservable()

  private _nationFilter$ = new BehaviorSubject<NationFilter>({ sortBy: '', stateName: '', maxPopulation: 40000000 });
  public nationFilter$ = this._nationFilter$.asObservable()

  public query() {
    const filterBy = this._nationFilter$.value
    let filteredNations = this._nationsDb
    if (filterBy.maxPopulation) {
      filteredNations = this._nationsDb.filter(nation => nation.Population < filterBy.maxPopulation)
    }
    if (filterBy.sortBy === 'alphabet') {
      filteredNations = filteredNations.sort((a, b) => a.State.localeCompare(b.State))
    }
    if (filterBy.sortBy === 'reversedAlphabet') {
      filteredNations = filteredNations.sort((a, b) => b.State.localeCompare(a.State))
    }
    if (filterBy.sortBy === 'mostPopulated') {
      filteredNations = filteredNations.sort((a, b) => b.Population - a.Population)
    }
    if (filterBy.sortBy === 'leastPopulated') {
      filteredNations = filteredNations.sort((a, b) => a.Population - b.Population)
    }
    this._nations$.next(filteredNations)
    this._setMostPopulated(filteredNations)
  }

  public createNations() {
    let nations = this._loadFromStorage('nationDB')
    if (!nations || !nations.length) {
      this._LoadNations()
        .subscribe(ans => {
          this._nationsDb = this._loadFromStorage('nationDB')
          nations = this._nationsDb
          this._nations$.next(nations);
        })
    }
    else {
      this._nationsDb = nations
      this._nations$.next(nations);
    }
  }

  public getByName(nationName: string): Observable<Nation> {
    const nation = this._nationsDb.find(nation => nation.State.toLocaleLowerCase() === nationName.toLocaleLowerCase())
    return nation ? of({ ...nation }) : of()
  }

  public getById(nationId: string): Observable<Nation> {
    const nation = this._nationsDb.find(nation => nation['ID State'] === nationId)
    return nation ? of({ ...nation }) : of()
  }


  public setFilter(nationFilter: NationFilter) {
    this._nationFilter$.next(nationFilter)
    this.query()
  }

  public getPopulationChangeStats(populationStats: NationYearPopulationStats[]) {
    return populationStats.slice(1).map((current, index) => {
      const previous = populationStats[index];
      const years = `${previous.year}-${current.year}`;
      const populationChange = current.population - previous.population;
      return { years, populationChange };
    })
  }

  public getCoords(stateName: string) {
    const API_Key = 'AIzaSyCWNRrGApZar-RMJ5hDCH8zRLA2TDISlPc'
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${stateName.toLocaleLowerCase()}&key=${API_Key}`
    return this.http.get<any>(url)
      .pipe(
        map(res => res.results),
        retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log('err:', err)
          return throwError(() => err)
        })
      )
  }

private _setMostPopulated(nations:Nation[]){

  const mostPopulated = nations.reduce((prev, current) => {
    return prev.Population > current.Population ? prev : current
  },nations[0])

  this._mostPopulatedNation$.next(mostPopulated);
}

  private _LoadNations() {
    return this.http.get<{ data: Nation[] }>('https://datausa.io/api/data?drilldowns=State&measures=Population&year=all')
      .pipe(
        map(res => res.data),
        map(res => {
          let nations: Nation[] = []
          for (let i = 0; i < 52; i++) {
            const currNation = res.filter(nation => res[i]['ID State'] === nation['ID State'])
            const convertedStats = currNation.map(nation => { return { year: nation.Year, population: nation.Population } }).reverse()
            const convertedNation = { ...res[i], populationStats: convertedStats }
            nations.push(convertedNation)
          }
          return nations
        }),
        tap(res1 => this._saveToStorage('nationDB', res1)),
        retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log('err:', err)
          return throwError(() => err)
        })
      )
  }

  private _saveToStorage(key: string, value: Nation[]) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  private _loadFromStorage(key: string) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
  }

}
