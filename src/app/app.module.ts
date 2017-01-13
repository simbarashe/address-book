import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, BrowserXhr } from '@angular/http';

import {CustExtBrowserXhr} from './shared/cust-ext-browser-xhr';
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { PopoverModule } from 'ng2-bootstrap/popover';
import { AlertModule } from 'ng2-bootstrap/alert';

import { PubNubAngular } from 'pubnub-angular2';

import { AppComponent } from './app.component';
import { SimpleformComponent } from './simpleform/simpleform.component';
import { ComplexformComponent } from './complexform/complexform.component';
import { FormvalidationsComponent } from './formvalidations/formvalidations.component';
import { LoginComponent } from './login/login.component';
import { ChildselectorComponent } from './childselector/childselector.component';
import { ChildcomponentComponent } from './childcomponent/childcomponent.component';
import { ParaentselectorComponent } from './paraentselector/paraentselector.component';
import { CounterComponent } from './counter/counter.component';
import { SearchComponent } from './search/search.component';
import { PeopleComponent } from './people/people.component';
import { PersonComponent } from './person/person.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { InputOuputComponent } from './input-ouput/input-ouput.component';
import { StringSplitterComponent } from './string-splitter/string-splitter.component';
import { ColorSelectorComponent } from './color-selector/color-selector.component';

import { EmployeeListComponent } from './employees/employee-list.component';
import { EmployeeService } from './employees/employee.service';
import { EmployeeDetailComponent } from './employees/employee-detail.component';

import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { EmployeeContactComponent } from './employees/employee-contact.component';
import { PersonService, Person } from './employees/person.service';
import { Configuration } from './shared/app.constants'
import { NotificationService } from './shared/notification.service'

@NgModule({
  declarations: [
    AppComponent,
    SimpleformComponent,
    ComplexformComponent,
    FormvalidationsComponent,
    LoginComponent,
    ChildselectorComponent,
    ChildcomponentComponent,
    ParaentselectorComponent,
    CounterComponent,
    SearchComponent,
    PeopleComponent,
    PersonComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeDetailsComponent,
    InputOuputComponent,
    StringSplitterComponent,
    ColorSelectorComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    EmployeeContactComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TypeaheadModule.forRoot(),
    DropdownModule.forRoot(),
    PopoverModule.forRoot()
  ],
  providers: [EmployeeService,PersonService,Configuration,PubNubAngular,NotificationService],
  bootstrap: [AppComponent] 
})
export class AppModule { }
