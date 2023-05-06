import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationPreviewComponent } from './nation-preview.component';

describe('NationPreviewComponent', () => {
  let component: NationPreviewComponent;
  let fixture: ComponentFixture<NationPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
