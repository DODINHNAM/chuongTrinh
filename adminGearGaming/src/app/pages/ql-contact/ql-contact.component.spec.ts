import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlContactComponent } from './ql-contact.component';

describe('QlContactComponent', () => {
  let component: QlContactComponent;
  let fixture: ComponentFixture<QlContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QlContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
