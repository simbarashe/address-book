import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-childselector',
  templateUrl: './childselector.component.html',
  styleUrls: ['./childselector.component.css']
})
export class ChildselectorComponent implements OnInit {
title = 'I\'m a nested component';

  constructor() { }

  ngOnInit() {
  }

}
