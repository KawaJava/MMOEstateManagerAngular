import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerAddComponent } from './admin-player-add.component';

describe('AdminPlayerAddComponent', () => {
  let component: AdminPlayerAddComponent;
  let fixture: ComponentFixture<AdminPlayerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlayerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
