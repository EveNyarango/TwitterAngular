import { Component, OnInit } from '@angular/core';
import { Tweet } from '../model/tweet';
import { TweetService } from '../service/tweet.service';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  tweets :Tweet[] = []
  searchInput: string = '';

  constructor(public tweetService: TweetService) { }

  ngOnInit(): void {
    this.getTweet()
  }

  getTweet(){
    this.tweetService.getTweets().subscribe(
      res => {
        this.tweets = res
        console.log(this.tweets)
      }
    )

  }

}
