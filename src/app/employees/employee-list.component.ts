import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from './employee'
import { Tag } from './tag'
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input()
  employees: Employee[] = [];

  @Input()
  employee: Employee;

  @Output() employeeChanged = new EventEmitter();
  @Output() tagsChanged = new EventEmitter();
   @Output() tagsAdded = new EventEmitter();
  ngOnInit() {
  }

  employeeChangedHandler(employee: Employee) {
    this.employeeChanged.emit(employee);
  }

  tagsChangedHandler() {
    this.tagsChanged.emit();
  }

  tagsAddedHandler() {
    this.tagsAdded.emit();
  }  
}
