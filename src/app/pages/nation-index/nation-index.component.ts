import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Nation } from 'src/app/models/nation.model';
import { NationService } from 'src/app/services/nation.service';


@Component({
  selector: 'nation-index',
  templateUrl: './nation-index.component.html',
  styleUrls: ['./nation-index.component.scss']
})
export class NationIndexComponent implements OnInit{

  constructor(
    private nationService: NationService,
) { }

nations!: Nation []
nations$!: Observable<Nation[]>
ans : any
// subscription!: Subscription
// msg = '

ngOnInit(): void {
  this.nationService.query()
  this.nations$ = this.nationService.nations$
}
}
