import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from '../model/tweet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  constructor(private httpClient: HttpClient) { }

  getTweets() : Observable<Tweet[]>{
    const headers = new HttpHeaders().set('content-type', 'application/json')
    let url = environment.baseUrl + "tweets?tweet=technology" 
    return this.httpClient.get<Tweet[]>(url, {headers})
  }
}
