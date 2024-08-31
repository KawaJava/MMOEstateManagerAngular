import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGoldHistoryComponent } from './admin-gold-history.component';

describe('AdminGoldHistoryComponent', () => {
  let component: AdminGoldHistoryComponent;
  let fixture: ComponentFixture<AdminGoldHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGoldHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGoldHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
