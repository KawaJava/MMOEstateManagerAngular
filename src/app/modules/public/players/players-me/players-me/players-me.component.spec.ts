import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersMeComponent } from './players-me.component';

describe('PlayersMeComponent', () => {
  let component: PlayersMeComponent;
  let fixture: ComponentFixture<PlayersMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
