import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerInactiveComponent } from './admin-player-inactive.component';

describe('AdminPlayerInactiveComponent', () => {
  let component: AdminPlayerInactiveComponent;
  let fixture: ComponentFixture<AdminPlayerInactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlayerInactiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerInactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
