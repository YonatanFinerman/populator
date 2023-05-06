import { Component, Input } from '@angular/core';
import { Nation } from 'src/app/models/nation.model';

@Component({
  selector: 'nation-preview',
  templateUrl: './nation-preview.component.html',
  styleUrls: ['./nation-preview.component.scss']
})
export class NationPreviewComponent {

  @Input() nation!: Nation
  
}
