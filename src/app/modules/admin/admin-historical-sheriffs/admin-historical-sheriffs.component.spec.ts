import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoricalSheriffsComponent } from './admin-historical-sheriffs.component';

describe('AdminHistoricalSheriffsComponent', () => {
  let component: AdminHistoricalSheriffsComponent;
  let fixture: ComponentFixture<AdminHistoricalSheriffsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHistoricalSheriffsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHistoricalSheriffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
