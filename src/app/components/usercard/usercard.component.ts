import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.css'],
})
export class UsercardComponent implements OnInit {
  @Input() user: any;
  twitterUrl: string | undefined;

  constructor() {}

  ngOnInit(): void {
    const user = this.user?.twitter_username;
    // https://twitter.com/Rohit_sony7
    this.twitterUrl = `https://twitter.com/${user}`;
    console.log(this.twitterUrl);
  }
}
