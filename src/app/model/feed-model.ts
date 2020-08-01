import { FeedEntry } from './feed-entry-model';

export interface Feed {
  rss: Rss;
}

export interface Page {
  total: number;
  items: FeedEntry[];
}

export interface Rss {
  version: string;
  channel: FeedInfo;
}

export interface FeedImage {
  link: string;
  title: string;
  url: string;
}

export interface FeedInfo {
  title: string;
  image: FeedImage;
  link: string;
  description: string;
  pubDate: Date;
  item: FeedEntry[];
}
