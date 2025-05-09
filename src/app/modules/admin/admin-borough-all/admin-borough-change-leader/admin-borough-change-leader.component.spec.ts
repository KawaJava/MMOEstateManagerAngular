import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoroughChangeLeaderComponent } from './admin-borough-change-leader.component';

describe('AdminBoroughChangeLeaderComponent', () => {
  let component: AdminBoroughChangeLeaderComponent;
  let fixture: ComponentFixture<AdminBoroughChangeLeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoroughChangeLeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoroughChangeLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
