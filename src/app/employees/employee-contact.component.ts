import { Component, OnInit, Input } from '@angular/core';
import { Employee } from './employee'
import { Contact } from './contact'

@Component({
  selector: 'app-employee-contact',
  templateUrl: './employee-contact.component.html',
  styleUrls: ['./employee-contact.component.css']
})
export class EmployeeContactComponent implements OnInit {

  @Input()
  employee: Employee;

  constructor() { }

  ngOnInit() {
  }

}
