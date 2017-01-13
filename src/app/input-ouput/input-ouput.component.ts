import { Component, OnInit, Input, Output, EventEmitter, Attribute } from '@angular/core';

@Component({
  selector: 'app-input-ouput',
  templateUrl: './input-ouput.component.html',
  styleUrls: ['./input-ouput.component.css']
})
export class InputOuputComponent implements OnInit {
  searchSpace: string;
  mymodel: string;
  private _growingString;
  private _growingFullName;
  @Output() stringChanged = new EventEmitter();
  @Output() fullNameChanged = new EventEmitter();
  @Input() counter: number;
  @Input() fixedValue: string;
  @Input('mySum') sum: number;
  @Input()
  set growingString(value) {
    this._growingString = value.toLowerCase();
    this.stringChanged.next({ value: 'changed to ' + this._growingString });
  }

  set growingFullName(value) {
    this._growingFullName = value.toLowerCase();
    this.fullNameChanged.next({ value: 'changed to ' + this._growingFullName });
  }

  get growingString() {
    return this._growingString;
  }

  get growingFullName() {
    return this._growingFullName;
  }
  constructor( @Attribute('plain') plain) {
    console.log(plain);
  }

  ngOnInit() {
  }

  valuechange(newValue) {
    this.mymodel = newValue;
    this.fullNameChanged.next({ value: this.mymodel });
  }

  performSearch(searchTerm: HTMLInputElement): void {
    this.searchSpace = searchTerm.value;
  }
}
