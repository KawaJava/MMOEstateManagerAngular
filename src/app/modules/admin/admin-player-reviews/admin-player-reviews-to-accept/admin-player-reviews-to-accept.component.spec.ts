import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlayerReviewsToAcceptComponent } from './admin-player-reviews-to-accept.component';

describe('AdminPlayerReviewsToAcceptComponent', () => {
  let component: AdminPlayerReviewsToAcceptComponent;
  let fixture: ComponentFixture<AdminPlayerReviewsToAcceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlayerReviewsToAcceptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlayerReviewsToAcceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
