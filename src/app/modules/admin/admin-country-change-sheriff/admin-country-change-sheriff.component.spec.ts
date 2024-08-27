import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountryChangeSheriffComponent } from './admin-country-change-sheriff.component';

describe('AdminCountryChangeSheriffComponent', () => {
  let component: AdminCountryChangeSheriffComponent;
  let fixture: ComponentFixture<AdminCountryChangeSheriffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCountryChangeSheriffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCountryChangeSheriffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
