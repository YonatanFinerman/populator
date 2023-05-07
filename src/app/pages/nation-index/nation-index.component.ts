import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Nation } from 'src/app/models/nation.model';
import { NationService } from 'src/app/services/nation.service';



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
  isFilterModalOpen = false

  ngOnInit(): void {
    this.nationService.query()
    this.nations$ = this.nationService.nations$
    this.cd.markForCheck()
  }

  onToggleFilterModal() {
    this.isFilterModalOpen = !this.isFilterModalOpen
  }

}
