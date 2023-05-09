import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Nation, NationFilter } from 'src/app/models/nation.model';
import { NationService } from 'src/app/services/nation.service';
import { Subscription} from 'rxjs';



@Component({
  selector: 'nation-index',
  templateUrl: './nation-index.component.html',
  styleUrls: ['./nation-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NationIndexComponent implements OnInit {

  constructor(
    private nationService: NationService,
    private cd: ChangeDetectorRef
  ) { }


  nations$!: Observable<Nation[]>
  mostPopulatedNation!: Nation
  isFilterModalOpen = false
  subscription!: Subscription

  ngOnInit(): void {
    this.nationService.query()
    this.nations$ = this.nationService.nations$
    
    this.subscription = this.nationService.mostPopulatedNation$.subscribe(ans=>{
      this.mostPopulatedNation = ans
      this.cd.markForCheck()
    })

    this.cd.markForCheck()
  }

  onToggleFilterModal() {
    this.isFilterModalOpen = !this.isFilterModalOpen
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
}

}
