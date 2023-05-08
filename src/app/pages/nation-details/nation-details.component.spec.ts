import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationDetailsComponent } from './nation-details.component';

describe('NationDetailsComponent', () => {
  let component: NationDetailsComponent;
  let fixture: ComponentFixture<NationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
