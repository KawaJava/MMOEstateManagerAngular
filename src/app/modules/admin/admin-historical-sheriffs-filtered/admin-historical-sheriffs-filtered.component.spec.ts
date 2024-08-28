import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoricalSheriffsFilteredComponent } from './admin-historical-sheriffs-filtered.component';

describe('AdminHistoricalSheriffsFilteredComponent', () => {
  let component: AdminHistoricalSheriffsFilteredComponent;
  let fixture: ComponentFixture<AdminHistoricalSheriffsFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHistoricalSheriffsFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHistoricalSheriffsFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
