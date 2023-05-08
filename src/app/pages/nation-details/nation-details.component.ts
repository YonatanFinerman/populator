import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Nation, NationYearPopulationStats } from 'src/app/models/nation.model';
import { NationService } from 'src/app/services/nation.service';

@Component({
  selector: 'nation-details',
  templateUrl: './nation-details.component.html',
  styleUrls: ['./nation-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NationDetailsComponent implements OnInit {

  constructor(
    private nationService: NationService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  nation!: Nation
  subscription!: Subscription
  grocodeSub!: Subscription
  coords! : {lat:number,lng:number}
  populationStats! : NationYearPopulationStats[] 
  
  async ngOnInit() {
    this.subscription = this.route.data.subscribe(data => {
      this.nation = data['nation']
      this.populationStats = this.nation.populationStats as NationYearPopulationStats[]
    })

    this.grocodeSub = this.nationService.getCoords(this.nation.State).subscribe(ans=>{
      this.coords = ans[0].geometry.location
      this.cd.markForCheck()
    })
 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    this.grocodeSub.unsubscribe()
  }

}
