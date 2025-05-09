import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerReviewsComponent } from './admin-player-reviews.component';

describe('AdminPlayerReviewsComponent', () => {
  let component: AdminPlayerReviewsComponent;
  let fixture: ComponentFixture<AdminPlayerReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlayerReviewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
