import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFeedsService } from '../view-feeds.service';
import { ViewFeedsComponent } from './view-feeds.component';

describe('ViewFeedsComponent', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let rssService: ViewFeedsService;

  beforeEach(() => {
    // Configures testing app module
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ViewFeedsService]
    });

    // Instantaites HttpClient, HttpTestingController and ViewFeedsService
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    rssService = TestBed.inject(ViewFeedsService);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verifies that no requests are outstanding.
  });

  describe('should check for GET all feeds response', () => {
    let expectedFeeds;

    beforeEach(() => {
      // Dummy data to be returned by request.
      expectedFeeds = {
        version: '"2.0"',
        channel: {
          title: 'Gadgets 360',
          image: {
            link: 'https://gadgets.ndtv.com/',
            title: 'Gadgets 360',
            url: 'https://cdn.gadgets360.com/gadgets360_logo.png'
          },
          link: 'https://gadgets.ndtv.com/',
          description: 'Abc Def',
          pubDate: 'Mon, 03 Aug 2020 20:03:01 +0530',
          item: {
            title: 'Gadgets 360',
            link: 'https://gadgets.ndtv.com/',
            guid: 'abs',
            pubDate: 'Mon, 03 Aug 2020 20:03:01 +0530',
            category: 'Internet',
            description: 'Mobile phones',
            content: 'Mobile'
          }
        }
      };
    });

    const url = 'https://gadgets.ndtv.com/';

    // Test case

    it('should return expected employees by calling once', () => {
      rssService
        .getFeedContent(url)
        .subscribe(
          feed =>
            expect(feed).toEqual(expectedFeeds, 'should return expected Feeds'),
          fail
        );

      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedFeeds); // Return expectedFeeds
    });
  });
});
