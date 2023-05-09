import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  Router } from '@angular/router';
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
  @Output() closeModal = new EventEmitter()

  isValidSearch:boolean = false
  errorMsg:string=''

  onCloseModal() {
    this.closeModal.emit()
    let x = 15
  }

  onFilterClick(form: NgForm) {
    const { value: filterBy } = form
    this.nationService.setFilter(filterBy)
    this.onCloseModal()
  }

  onSearchState(stateName: string) {
    this.nationService.getByName(stateName).subscribe(ans => {
      this.router.navigateByUrl(`/nation/${ans['ID State']}`)
      this.isValidSearch = true
    })

    if(!this.isValidSearch){
      this.errorMsg = 'No such state!'
    }
  }
}
