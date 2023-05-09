import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Nation } from 'src/app/models/nation.model';

@Component({
  selector: 'nation-preview',
  templateUrl: './nation-preview.component.html',
  styleUrls: ['./nation-preview.component.scss']
})
export class NationPreviewComponent implements  OnChanges {

  constructor(private cd: ChangeDetectorRef){}

  @Input() nation!: Nation
  @Input() mostPopulatedNation!: Nation

  isMostPopulated:boolean = false

  ngOnChanges():void{
    if(this.nation.State===this.mostPopulatedNation.State){
      this.isMostPopulated = true
      this.cd.markForCheck()
    }
    else{
      this.isMostPopulated = false
      this.cd.markForCheck()
    }
  }

}
