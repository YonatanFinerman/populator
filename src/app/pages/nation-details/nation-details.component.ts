import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Nation } from 'src/app/models/nation.model';
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
  coords! : {lat:number,lng:number}

  async ngOnInit() {
    this.subscription = this.route.data.subscribe(data => {
      this.nation = data['nation']
      console.log('data', data['nation'])
    })

    this.nationService.getCoords(this.nation.State)

  }

  onBack() {
    this.router.navigateByUrl('/nation')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
