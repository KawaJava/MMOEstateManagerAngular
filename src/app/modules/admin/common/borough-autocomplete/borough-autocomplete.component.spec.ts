import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoroughAutocompleteComponent } from './borough-autocomplete.component';

describe('BoroughAutocompleteComponent', () => {
  let component: BoroughAutocompleteComponent;
  let fixture: ComponentFixture<BoroughAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoroughAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoroughAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
