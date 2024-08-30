import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoricalLeadersFilteredComponent } from './admin-historical-leaders-filtered.component';

describe('AdminHistoricalLeadersFilteredComponent', () => {
  let component: AdminHistoricalLeadersFilteredComponent;
  let fixture: ComponentFixture<AdminHistoricalLeadersFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHistoricalLeadersFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHistoricalLeadersFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
