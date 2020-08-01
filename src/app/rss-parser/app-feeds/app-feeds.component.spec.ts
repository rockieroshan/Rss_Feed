import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeedsComponent } from './app-feeds.component';

describe('AppFeedsComponent', () => {
  let component: AppFeedsComponent;
  let fixture: ComponentFixture<AppFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
