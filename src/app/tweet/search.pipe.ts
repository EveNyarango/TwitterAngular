import { Pipe, PipeTransform } from '@angular/core';
import { Tweet } from '../model/tweet';

@Pipe({
    name:'search'
})
export class SearchPipe implements PipeTransform {
    transform(tweets: Tweet[], searchInput: string): any[]{     
        if(!searchInput) {
            return tweets;
        }
       searchInput = searchInput.toLowerCase();
       return tweets.filter(
           tweet =>tweet.text.toLowerCase().includes(searchInput)
       )
     }
}