import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlReviewComponent } from './ql-review.component';

describe('QlReviewComponent', () => {
  let component: QlReviewComponent;
  let fixture: ComponentFixture<QlReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
