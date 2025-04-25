import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldInBoroughComponent } from './gold-in-borough.component';

describe('GoldInBoroughComponent', () => {
  let component: GoldInBoroughComponent;
  let fixture: ComponentFixture<GoldInBoroughComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldInBoroughComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldInBoroughComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
