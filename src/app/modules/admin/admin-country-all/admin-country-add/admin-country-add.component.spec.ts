import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCountryAddComponent } from './admin-country-add.component';

describe('AdminCountryAddComponent', () => {
  let component: AdminCountryAddComponent;
  let fixture: ComponentFixture<AdminCountryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCountryAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCountryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
