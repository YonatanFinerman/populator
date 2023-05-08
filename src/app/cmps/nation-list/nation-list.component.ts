import { Component, Input } from '@angular/core';
import { Nation } from 'src/app/models/nation.model';

@Component({
  selector: 'nation-list',
  templateUrl: './nation-list.component.html',
  styleUrls: ['./nation-list.component.scss']
})
export class NationListComponent {

  @Input() nations!: Nation[] | null
  // @Input() pets!: Pet[] | null

  trackByFn(idx:number,nation:Nation){
    return nation['ID State']
  }
}
