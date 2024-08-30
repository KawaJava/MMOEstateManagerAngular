import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHistoricalLeadersComponent } from './admin-historical-leaders.component';

describe('AdminHistoricalLeadersComponent', () => {
  let component: AdminHistoricalLeadersComponent;
  let fixture: ComponentFixture<AdminHistoricalLeadersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHistoricalLeadersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHistoricalLeadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
