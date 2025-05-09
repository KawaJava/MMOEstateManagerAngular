import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountryUpdateComponent } from './admin-country-update.component';

describe('AdminCountryUpdateComponent', () => {
  let component: AdminCountryUpdateComponent;
  let fixture: ComponentFixture<AdminCountryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCountryUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCountryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
