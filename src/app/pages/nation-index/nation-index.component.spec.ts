import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationIndexComponent } from './nation-index.component';

describe('NationIndexComponent', () => {
  let component: NationIndexComponent;
  let fixture: ComponentFixture<NationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
