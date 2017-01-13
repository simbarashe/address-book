import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';

import { Employee } from './employees/employee'
import { Tag } from './employees/tag'
import { EmployeeService } from './employees/employee.service';
import { PersonService, Person } from './employees/person.service';
import { NotificationService } from './shared/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public myValue: number = 2;
  //public myString:string = 'Simba Sithole';
  count = 0;
  runningTotal = 0;
  myString = '';
  myFullName = '';
  strDelimiter: string = ",";
  strInitialString: string = "I,Like,Divesh,Blog";
  color: string = "White";
  FirstName: string = "White";
  SearchString: string = '';

  employee: Employee;
  employees: Employee[] = [];
  tags: Tag[] = [];
  noOfEmployees: number = 0;
  persons: Person[] = [];

  myValueChange(event) {
    console.log(event);
  }
  myStringChange(event) {
    console.log(event);
  }

  update() {
    this.count++;
    this.runningTotal += this.count;
    this.myString += 'A';
  }
  myStringChanged(val) {
    console.log(val);
  }
  myFullNameChanged(val) {
    console.log(val);
  }

  ColorChangedHandler(color: string) {
    this.color = color;
  }

  FirstNameChangedHandler(firstName: string) {
    this.FirstName = firstName;
  }

  searchHandler(searchString: string) {
    this.SearchString = searchString;
  }

  getEmployees(query = '') {
    return this.employeeService.get(query).then(employees => {
      this.employees = employees;
      this.employee = employees.filter(x => true)[0];
      this.noOfEmployees = employees.length;
    });
  }

  getPeople(query = '') {
    return this._personService.loadData().then(data => {
      this.persons = data;
    })
  }

  getContactsById(query: number) {
    return this.employeeService.getEmployeesById(query).then(employees => {
      this.employees = employees;
      this.employee = employees.filter(x => true)[0];
      this.noOfEmployees = employees.length;
    });
  }

  getContactsByTagId(query: number) {
    return this.employeeService.getEmployeesByTagId(query).then(employees => {
      this.employees = employees;
      this.employee = employees.filter(x => true)[0];
      this.noOfEmployees = employees.length;
    });
  }

  getTags() {
    return this.employeeService.getTags().then(tags => {
      console.log(tags);
      this.tags = tags;
    });
  }


  @ViewChild('notifier') notifier: ElementRef;
  status: { isopen: boolean } = { isopen: false };
  message: string = '';
  channel: string = 'address-book-channel';
  constructor(private employeeService: EmployeeService,
    private _personService: PersonService,
    private renderer: Renderer
    , private _notificationService: NotificationService
  ) {
  }

  public notifyUser(msg: any) {
    console.log(msg.message.body);
    this.message = `New tag: ${msg.message.body}`;
    this.renderer.invokeElementMethod(this.notifier.nativeElement, 'click');
    setTimeout(() => {
      if (this.status.isopen) {
        this.status.isopen = !this.status.isopen;
        this.renderer.invokeElementMethod(this.notifier.nativeElement, 'click')
      }
    }, 3000);
  }

  updateStatus(event) {
    this.status.isopen = !this.status.isopen;
  }

  setupNotification() {
    this._notificationService.subscribeToChannel();
  }

  processNotification() {
    this._notificationService.getMessage((message) => this.notifyUser(message));
  }

  ngOnInit() {
    this.getEmployees()
  }

  ngAfterViewInit() {
    this.setupNotification();
    this.processNotification();
  }

  employeeChangedHandler(employee: Employee) {
    this.employee = employee;
  }

  selectedContactHandler(employee: Employee) {
    this.getContactsById(employee.id)
  }

  selectedTagHandler(tag: Tag) {
    this.getContactsByTagId(tag.id)
  }

  tagsChangedHandler() {
    this.getEmployees();
  }

  tagsAddedHandler() {
    this.processNotification();
  }
}
