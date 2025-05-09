import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoroughUpdateComponent } from './admin-borough-update.component';

describe('AdminBoroughUpdateComponent', () => {
  let component: AdminBoroughUpdateComponent;
  let fixture: ComponentFixture<AdminBoroughUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoroughUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoroughUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
