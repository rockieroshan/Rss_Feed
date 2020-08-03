import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationService } from '../../shared/notification/notification.service';
import { ViewFeedsService } from '../view-feeds.service';

@Component({
  selector: 'app-app-feeds',
  templateUrl: './app-feeds.component.html',
  styleUrls: ['./app-feeds.component.sass']
})
export class AppFeedsComponent implements OnInit {
  rssForm: FormGroup;
  validUrl: boolean;
  constructor(
    private viewFeedsService: ViewFeedsService,
    private router: Router,
    private formbuilder: FormBuilder,
    public msg: NotificationService
  ) {}

  ngOnInit() {
    this.rssForm = this.formbuilder.group({
      url: ['', Validators.required]
    });
    localStorage.removeItem('url');
  }
  urlValidator() {
    try {
      // tslint:disable-next-line:no-unused-expression
      new URL(this.rssForm.value.url);
      this.validUrl = true;
    } catch {
      this.validUrl = false;
    }
    return (
      this.validUrl
        ? this.sendUrl(this.rssForm)
        : this.msg.addMessageToNotification(
            'error',
            'Error',
            'Please enter a vaild url'
          ),
      this.rssForm.reset()
    );
  }

  sendUrl(formData: FormGroup): void {
    this.viewFeedsService.setUrl(formData.value.url);
    this.router.navigate(['/feeds/view']);
  }
}
