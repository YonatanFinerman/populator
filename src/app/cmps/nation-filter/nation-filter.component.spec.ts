import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationFilterComponent } from './nation-filter.component';

describe('NationFilterComponent', () => {
  let component: NationFilterComponent;
  let fixture: ComponentFixture<NationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
