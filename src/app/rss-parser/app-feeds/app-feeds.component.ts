import { Component, OnInit } from '@angular/core';
import { ViewFeedsService } from '../view-feeds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-feeds',
  templateUrl: './app-feeds.component.html',
  styleUrls: ['./app-feeds.component.sass']
})
export class AppFeedsComponent implements OnInit {
  ngModelUrl: string;
  loading: boolean;
  constructor(
    private viewFeedsService: ViewFeedsService,
    private router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('url');
  }
  sendUrl(url: string): void {
    this.viewFeedsService.setUrl(url);
    this.router.navigate(['/feeds/view']);
  }
}
