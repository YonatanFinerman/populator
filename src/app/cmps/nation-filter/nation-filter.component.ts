import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nation-filter',
  templateUrl: './nation-filter.component.html',
  styleUrls: ['./nation-filter.component.scss']
})
export class NationFilterComponent {

  @Input() isFilterModalOpen! : boolean
  @Output() closeModal = new EventEmitter()

  onCloseModal() { 
    this.closeModal.emit()
  }

 
}
