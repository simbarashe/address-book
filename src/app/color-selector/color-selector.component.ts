import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css']
})
export class ColorSelectorComponent implements OnInit {
  @Output() ColorChanged = new EventEmitter();
  @Output() FirstNameChanged = new EventEmitter();
  SelectedColor: string;
  colors: string[];
  FirstName: string = '';

  constructor() { }

  ngOnInit() {
    this.colors = ["orange", "cyan", "yellow", 'red']; // Set all allowed colors
    this.SelectedColor = this.colors[0]; // Initialize the SelectedColor
    this.ColorChanged.emit(this.SelectedColor) // emit the Initialized color.
  }

  ColorSelected() {
    this.ColorChanged.emit(this.SelectedColor); // emit the selected color.
  }

  FirstNameChange() {
    this.FirstNameChanged.emit(this.FirstName); // emit the selected color.
  }
}
