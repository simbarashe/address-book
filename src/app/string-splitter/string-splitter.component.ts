import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-splitter',
  templateUrl: './string-splitter.component.html',
  styleUrls: ['./string-splitter.component.css']
})
export class StringSplitterComponent implements OnInit {
  @Input() Delimiter;
  @Input() InitialString;
  items: string[];

  constructor() { }

  ngOnInit() {
    this.items = this.InitialString.split(",");
  }

}
