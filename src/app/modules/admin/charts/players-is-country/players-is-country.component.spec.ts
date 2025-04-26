import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersIsCountryComponent } from './players-is-country.component';

describe('PlayersIsCountryComponent', () => {
  let component: PlayersIsCountryComponent;
  let fixture: ComponentFixture<PlayersIsCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersIsCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersIsCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
