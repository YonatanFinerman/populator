import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NationFilter } from 'src/app/models/nation.model';
import { NationService } from 'src/app/services/nation.service';

@Component({
  selector: 'nation-filter',
  templateUrl: './nation-filter.component.html',
  styleUrls: ['./nation-filter.component.scss']
})
export class NationFilterComponent {

  constructor(
    private nationService: NationService,
    private router: Router,
    ) { }

  @Input() isFilterModalOpen!: boolean
  @Input() nationFilter!: NationFilter
  @Output() closeModal = new EventEmitter()

  // left:string = (this.nationFilter.maxPopulation / 2) + '%'

  onCloseModal() {
    this.closeModal.emit()
  }

  onFilterClick(form: NgForm) {
    const { value: filterBy } = form
    this.nationService.setFilter(filterBy)   
    this.onCloseModal()
  }

  onSearchState(stateName: string) {
    this.nationService.getByName(stateName).subscribe(ans=>{
      console.log(ans,'this is ans')
      this.router.navigateByUrl(`/nation/${ans['ID State']}`)
    })

  }
}
