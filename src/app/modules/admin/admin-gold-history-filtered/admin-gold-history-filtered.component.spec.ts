import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoldHistoryFilteredComponent } from './admin-gold-history-filtered.component';

describe('AdminGoldHistoryFilteredComponent', () => {
  let component: AdminGoldHistoryFilteredComponent;
  let fixture: ComponentFixture<AdminGoldHistoryFilteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoldHistoryFilteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoldHistoryFilteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
