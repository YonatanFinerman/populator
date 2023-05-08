import { Component, OnInit } from '@angular/core';
import { NationService } from '../services/nation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private nationService:NationService) { }

  title = 'populator';

  ngOnInit(): void {
    this.nationService.createNations()
  }

}
