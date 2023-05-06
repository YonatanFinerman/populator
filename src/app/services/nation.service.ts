import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, retry, tap, throwError } from 'rxjs';
import { Nation } from '../models/nation.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NationService {

  constructor(private http: HttpClient) { }

  // Mock the database

  //    private _nationsDb: Nation[] = [
  //     { _id: 'p123', name: 'Penrose', age: 2, birthDate: new Date('2020-11-12') },
  //     { _id: 'p124', name: 'Bobo', age: 6, birthDate: new Date('2021-8-30') },
  //     { _id: 'p125', name: 'Gertrude', age: 1, birthDate: new Date('2021-11-1') },
  //     { _id: 'p126', name: 'Popovich', age: 62, birthDate: new Date('1950-3-30') },
  // ];
  private _nationsDb: Nation[] = []

  private _nations$ = new BehaviorSubject<Nation[]>([]);
  public nations$ = this._nations$.asObservable()

  // private _nationFilter$ = new BehaviorSubject<NationFilter>({ term: '' });
  // public nationFilter$ = this._nationFilter$.asObservable()


  // public query() {
  //     const filterBy = this._nationFilter$.value
  //     const nations = this._nationsDb.filter(({ name }) => {
  //         return name.toLowerCase().includes(filterBy.term.toLowerCase());
  //     });
  //     this._nations$.next(nations);
  // }
  public query() {
    let nations = this.loadFromStorage('nationDB')
    if (!nations || !nations.length) {
      this.LoadNations()
        .subscribe(ans => {
          this._nationsDb = this.loadFromStorage('nationDB')
          nations = this._nationsDb
        })
    }
    // const filterBy = this._nationFilter$.value
    // const nations = this._nationsDb.filter(({ name }) => {
    //     return name.toLowerCase().includes(filterBy.term.toLowerCase());
    // });
    console.log(nations, 'bobo')
    this._nations$.next(nations);

  }

  public LoadNations() {

    return this.http.get<{ data: Nation[] }>('https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest')
      .pipe(
        map(res => res.data),
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

  // public getById(nationId: string): Observable<Nation> {
  //     const nation = this._nationsDb.find(nation => nation._id === nationId)
  //     return nation ? of({ ...nation }) : of()
  // }


  // public save(nation: Nation) {
  //     return nation._id ? this._edit(nation) : this._add(nation)
  // }

  // public setFilter(nationFilter: NationFilter) {
  //     this._nationFilter$.next(nationFilter)
  //     this.query()
  // }

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
