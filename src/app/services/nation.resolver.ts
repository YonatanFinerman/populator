import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, delay, of } from 'rxjs';
import { Nation } from '../models/nation.model';
import { NationService } from './nation.service';

@Injectable({
  providedIn: 'root'
})
export class NationResolver implements Resolve<Nation> {

  constructor(private nationService:NationService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Nation> {
    const id = route.params['id']
    return this.nationService.getById(id);
  }
}
