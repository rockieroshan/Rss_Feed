import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedsComponent } from './view-feeds.component';

describe('AddImgComponent', () => {
  let component: ViewFeedsComponent;
  let fixture: ComponentFixture<ViewFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewFeedsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
