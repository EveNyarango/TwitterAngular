import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from '../model/tweet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

tweetUri = environment.baseUrl + "tweets?tweet=technology" 

  constructor(private httpClient: HttpClient) { }

  getTweets() : Observable<Tweet[]>{
    const headers = new HttpHeaders().set('content-type', 'application/json')
    
    return this.httpClient.get<Tweet[]>(this.tweetUri, {headers})
  }
}
