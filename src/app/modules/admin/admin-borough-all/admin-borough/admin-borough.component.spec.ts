import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBoroughComponent } from './admin-borough.component';

describe('AdminBoroughComponent', () => {
  let component: AdminBoroughComponent;
  let fixture: ComponentFixture<AdminBoroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBoroughComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBoroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
