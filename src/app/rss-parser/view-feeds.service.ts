import { Observable, ReplaySubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import * as xml2js from 'xml2js';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Feed, Page } from '../model/feed-model';

@Injectable({
  providedIn: 'root'
})
export class ViewFeedsService {
  private sharedUrl$ = new ReplaySubject<string>(1);
  url$ = this.sharedUrl$.asObservable();

  constructor(private http: HttpClient) {}

  setUrl(url: string) {
    if (url) {
      localStorage.setItem('url', url);
    }
    console.log(localStorage.getItem('url'), 'local');
    this.sharedUrl$.next(localStorage.getItem('url'));
  }

  getFeedContent(url: string): Observable<Feed> {
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(this.extractFeeds),
      delay(500)
    );
  }

  private extractFeeds(response: any): Feed {
    const parser = new xml2js.Parser({
      explicitArray: false,
      mergeAttrs: true
    });
    let feed: any;
    parser.parseString(response, (err: any, result: any) => {
      if (err) {
        console.warn(err);
      }
      feed = result;
    });
    return feed || {};
  }
}
