import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, retry, tap, throwError } from 'rxjs';
import { Nation, NationFilter } from '../models/nation.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NationService {

  constructor(private http: HttpClient) { }

  private _nationsDb: Nation[] = []

  private _nations$ = new BehaviorSubject<Nation[]>([]);
  public nations$ = this._nations$.asObservable()

  private _nationFilter$ = new BehaviorSubject<NationFilter>({ sortBy: '', stateName: '', maxPopulation: 40000000 });
  public nationFilter$ = this._nationFilter$.asObservable()



  public query() {
    const filterBy = this._nationFilter$.value
    let filteredNations = this._nationsDb
    if(filterBy.maxPopulation){
      filteredNations = this._nationsDb.filter(nation=>nation.Population<filterBy.maxPopulation)
    }
    if(filterBy.sortBy === 'alphabet'){
      filteredNations = filteredNations.sort((a, b) => a.State.localeCompare(b.State))
    }
    if(filterBy.sortBy === 'reversedAlphabet'){
      filteredNations = filteredNations.sort((a, b) => b.State.localeCompare(a.State))
    }
    if(filterBy.sortBy === 'mostPopulated'){
      filteredNations = filteredNations.sort((a, b) => b.Population - a.Population)     
    }
    if(filterBy.sortBy === 'leastPopulated'){
      filteredNations = filteredNations.sort((a, b) => a.Population - b.Population)
    }
    this._nations$.next(filteredNations);
  }

  public createNations(){
    let nations = this.loadFromStorage('nationDB')
    if (!nations || !nations.length) {
      this._LoadNations()
        .subscribe(ans => {
          this._nationsDb = this.loadFromStorage('nationDB')
          nations = this._nationsDb
          this._nations$.next(nations);
        })
    }
    else {
      console.log(nations, 'bobo')
      this._nationsDb = nations
      this._nations$.next(nations);
    }
  }

  private _LoadNations() {
    return this.http.get<{ data: Nation[] }>('https://datausa.io/api/data?drilldowns=State&measures=Population&year=all')
      .pipe(
        map(res => res.data),
        map(res => {
          let nations: Nation[] = []
          for (let i = 0; i < 52; i++) {
            const currNation = res.filter(nation => res[i]['ID State'] === nation['ID State'])
            const convertedStats = currNation.map(nation => { return { year: nation.Year, population: nation.Population } })
            const convertedNation = { ...res[i], populationStats: convertedStats }
            nations.push(convertedNation)
          }
          return nations
        }),
        tap(res1 => this.saveToStorage('nationDB', res1)),
        tap(res1 => console.log(res1, 'brbr')),
        retry(1),
        catchError((err: HttpErrorResponse) => {
          console.log('err:', err)
          return throwError(() => err)
        })
      )
  }




  // public shouldAdoptNation() {
  //     return this.http.get<{ answer: string }>('https://yesno.wtf/api')
  //         .pipe(
  //             map(res => res.answer),
  //             retry(1),
  //             catchError((err: HttpErrorResponse) => {
  //                 console.log('err:', err)
  //                 return throwError(() => err)
  //             })
  //         )
  // }


  // public getEmptyNation() {
  //     return { name: '', age: 0, birthDate: new Date() }
  // }

  // public remove(nationId: string) {
  //     const nations = this._nationsDb
  //     const nationIdx = nations.findIndex(nation => nation._id === nationId)
  //     nations.splice(nationIdx, 1)
  //     this._nations$.next(nations);
  //     return of()
  // }

  public getByName(nationName: string): Observable<Nation> {
    const nation = this._nationsDb.find(nation => nation.State.toLocaleLowerCase() === nationName.toLocaleLowerCase())
    return nation ? of({ ...nation }) : of()
  }

  public getById(nationId: string): Observable<Nation> {
    const nation = this._nationsDb.find(nation => nation['ID State'] === nationId)
    return nation ? of({ ...nation }) : of()
  }


  // public save(nation: Nation) {
  //     return nation._id ? this._edit(nation) : this._add(nation)
  // }

  public setFilter(nationFilter: NationFilter) {
    this._nationFilter$.next(nationFilter)
    this.query()
  }

  // private _add(nation: Nation) {
  //     nation._id = this._makeId()
  //     this._nationsDb.push(nation)
  //     this._nations$.next([...this._nationsDb])
  //     return of(nation)
  // }

  // private _edit(nation: Nation) {
  //     const nations = this._nationsDb
  //     const nationIdx = nations.findIndex(_nation => _nation._id === nation._id)
  //     nations.splice(nationIdx, 1, nation)
  //     this._nations$.next([...nations])
  //     return of(nation)
  // }

  private _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private saveToStorage(key: string, value: Nation[]) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  private loadFromStorage(key: string) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
  }

}
