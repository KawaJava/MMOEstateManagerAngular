import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClansIsCountryComponent } from './clans-is-country.component';

describe('ClansIsCountryComponent', () => {
  let component: ClansIsCountryComponent;
  let fixture: ComponentFixture<ClansIsCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClansIsCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClansIsCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
