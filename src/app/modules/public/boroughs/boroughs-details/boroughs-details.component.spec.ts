import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoroughsDetailsComponent } from './boroughs-details.component';

describe('BoroughsDetailsComponent', () => {
  let component: BoroughsDetailsComponent;
  let fixture: ComponentFixture<BoroughsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoroughsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoroughsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
