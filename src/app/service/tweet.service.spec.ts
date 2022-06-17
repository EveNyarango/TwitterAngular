import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { TweetService } from './tweet.service';
import { HttpClient } from '@angular/common/http';
import { Tweet } from '../model/tweet';

describe('TweetService', () => {
  let tweetService: TweetService;
  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TweetService]
    });
    tweetService = TestBed.inject(TweetService);
    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify;

  });

  describe('#getTweets', () => {
    let expectedTweets: Tweet[];
    beforeEach(() => {

      expectedTweets = [
        { id: 23, text: 'Programming' },
        { id: 25, text: 'Thinktwice' },
      ] as Tweet[];
    });

    //Test 1
    it('service created', () => {
      expect(tweetService).toBeDefined();
    });

    //Test 2
    it('should return tweets when called once', () => {
      tweetService.getTweets().subscribe(
        tweets => expect(tweets).toEqual(expectedTweets, 'should return tweets when called once'), fail
      );

      const req = httpController.expectOne(tweetService.tweetUri);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedTweets); //Return expectedTweets
    })

    //Test 3
    it('Should be ok returning no tweets', () => {
      tweetService.getTweets().subscribe(
        tweets => expect(tweets.length).toEqual(0, 'should have empty tweet array'),
        fail
      );

      const req = httpController.expectOne(tweetService.tweetUri);
      req.flush([]);
    });

    //Test 4 should make the backend return 404 error
    // it('should return a 404 error into an empty tweet result', () => {
    //   tweetService.getTweets().subscribe(
    //     tweets => expect(tweets.length).toEqual(0, 'should return a 404 error into an empty tweet result'),
    //     fail
    //   );

    //   const req = httpController.expectOne(tweetService.tweetUri);
    //   const message = '404 error';
    //   req.flush(message, { status: 404, statusText: 'Not Found'});
    // });

    //Test 5
    it('should return tweets when called multiple times', () => {
      tweetService.getTweets().subscribe();
      tweetService.getTweets().subscribe(
        tweets => expect(tweets).toEqual(expectedTweets, 'should return tweets when called multiple times'), fail
      );

      const req = httpController.match(tweetService.tweetUri);
      expect(req.length).toEqual(2, 'calls to getTweets()');

      req[0].flush([]);
      req[1].flush(expectedTweets);
    });

  });

})




function expectedTweets(expectedTweets: any, arg1: string): void {
  throw new Error('Function not implemented.');
}

