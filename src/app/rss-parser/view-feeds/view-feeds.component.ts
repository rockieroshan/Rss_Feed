import { Observable, of, Subject } from 'rxjs';
import {
  delay,
  map,
  pluck,
  share,
  startWith,
  switchMap,
  takeUntil
} from 'rxjs/operators';
import { FeedEntry } from 'src/app/model/feed-entry-model';
import { FeedInfo, Page } from 'src/app/model/feed-model';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationService } from '../../shared/notification/notification.service';
import { ViewFeedsService } from '../view-feeds.service';

@Component({
  selector: 'app-view-feeds',
  templateUrl: './view-feeds.component.html',
  styleUrls: ['./view-feeds.component.scss']
})
export class ViewFeedsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  total$: Observable<number>;
  items$: Observable<FeedEntry[]>;
  loading: boolean;
  feedChannel: FeedInfo;
  feeds: Array<FeedEntry> = [];
  page: number;
  private pageStream = new Subject<number>();

  constructor(
    private viewFeedsService: ViewFeedsService,
    public msg: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.fetchUrl();
    this.page = 1;
  }

  fetchUrl(): void {
    let urlOb$ = '';
    this.viewFeedsService.url$.subscribe(url => {
      urlOb$ = url;
    });
    const localUrl = localStorage.getItem('url') || urlOb$;
    if (localUrl) {
      this.getFeeds(localUrl);
    } else {
      this.router.navigate(['/feeds/add']);
    }
  }

  getFeeds(url: string): void {
    this.feeds.length = 0;
    this.viewFeedsService
      .getFeedContent(url)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        feed => {
          this.feedChannel = feed.rss.channel;
          this.feeds = feed.rss.channel.item;
          const pageSource = this.pageStream.pipe(
            map(pageNumber => {
              this.page = pageNumber;
              return { page: pageNumber };
            })
          );
          const source = pageSource.pipe(
            startWith({ page: this.page }),
            switchMap((params: { page: number }) => {
              return this.paginationCalc(params.page);
            }),
            share()
          );
          this.total$ = source.pipe(pluck('total'));
          this.items$ = source.pipe(pluck('items'));
          this.loading = false;
          this.msg.addMessageToNotification(
            'success',
            'Success',
            'Feeds loaded successfully'
          );
        },
        error => {
          this.loading = false;
          this.msg.addMessageToNotification(
            'error',
            'Error',
            'Please check your Url'
          );
          this.router.navigate(['/feeds/add']);
        }
      );
  }

  paginationCalc(page: number = 1, limit: number = 10): Observable<Page> {
    const resultPage = this.feeds.slice((page - 1) * limit, page * limit);
    return of({ total: this.feeds.length, items: resultPage }).pipe(delay(100));
  }

  goToPage(page: number): void {
    this.pageStream.next(page);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
