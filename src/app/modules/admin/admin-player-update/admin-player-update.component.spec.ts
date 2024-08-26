import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerUpdateComponent } from './admin-player-update.component';

describe('AdminPlayerUpdateComponent', () => {
  let component: AdminPlayerUpdateComponent;
  let fixture: ComponentFixture<AdminPlayerUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlayerUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
