import { Injectable } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';

@Injectable()
export class NotificationService {

  constructor(private _pubNubService: PubNubAngular) {
    _pubNubService.init({
      publishKey: 'pub-c-08a0547f-e75c-4ecd-b2fb-91bd0a853582',
      subscribeKey: 'sub-c-e686948e-d7dc-11e6-984c-02ee2ddab7fe'
    });
  }
  

}
