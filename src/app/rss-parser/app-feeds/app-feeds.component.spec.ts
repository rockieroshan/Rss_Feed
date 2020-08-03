import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFeedsComponent } from './app-feeds.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppFeedsComponent', () => {
  let component: AppFeedsComponent;
  let fixture: ComponentFixture<AppFeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppFeedsComponent],
      imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should check for validate URL', () => {
    // tslint:disable-next-line:no-string-literal
    component.rssForm.controls['url'].setValue(
      'https://gadgets.ndtv.com/rss/feeds'
    );
    component.urlValidator();
    expect(component.validUrl).toBeTruthy();
  });

  it('should check for invalidate URL', () => {
    // tslint:disable-next-line:no-string-literal
    component.rssForm.controls['url'].setValue('notValidUrl');
    component.urlValidator();
    expect(component.validUrl).toBeFalsy();
  });

  it('form should be valid', () => {
    // tslint:disable-next-line:no-string-literal
    component.rssForm.controls['url'].setValue('');
    component.urlValidator();
    expect(component.validUrl).toBeFalsy();
  });

  it('form should be invalid', () => {
    // tslint:disable-next-line:no-string-literal
    component.rssForm.controls['url'].setValue(
      'https://gadgets.ndtv.com/rss/feeds'
    );
    component.urlValidator();
    expect(component.validUrl).toBeTruthy();
  });
});
