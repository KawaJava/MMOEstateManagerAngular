import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoroughAddComponent } from './admin-borough-add.component';

describe('AdminBoroughAddComponent', () => {
  let component: AdminBoroughAddComponent;
  let fixture: ComponentFixture<AdminBoroughAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoroughAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoroughAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
