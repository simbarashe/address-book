import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TypeaheadMatch } from 'ng2-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { EmployeeService } from './../employees/employee.service';
import { Employee } from './../employees/employee';
import { Tag } from './../employees/tag';
import { SearchResult } from './../shared/search-object';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchString: string = '';

  @Output() searchStringChanged = new EventEmitter();
  @Output() contactSelected = new EventEmitter();
  @Output() tagSelected = new EventEmitter();

  ngOnInit() {
  }

  searchStringChange() {
    this.searchStringChanged.emit(this.searchString);
  }

  public dataSource: Observable<any>;
  public asyncSelected: string = '';
  public typeaheadLoading: boolean = false;
  public typeaheadNoResults: boolean = false;



  constructor(private _employeeService: EmployeeService) {

    this.dataSource = Observable.create((observer: any) =>
      observer.next(this.asyncSelected))
      .mergeMap((token: string) => {
        /*        this._employeeService.get(token).then(data => {
                  return data.map(this.decodeSearch);
                })*/
        this.searchString = token;
        if (token.startsWith('#')) {
          var actualSearchString = token.substr(1, token.length - 2)
          return this.getObservableTags(actualSearchString);
        }
        else {
          return this.getObservableContacts(token);
        }
      });
  }


  public getObservableContacts(token: string): Promise<SearchResult[]> {
    return this._employeeService.get(token).then(data => {
      return data.map(this.decodeEmployee);
    })
  }

  public getObservableTags(token: string): Promise<SearchResult[]> {
    return this._employeeService.getTags(token).then(data => {
      return data.map(this.decodeTag);
    })
  }

  decodeEmployee(json: Employee): SearchResult {
    return {
      id: json.id,
      description: json.lastName + ' ' + json.firstName + ' ' + json.designation + ' at ' + json.companyName,
    };
  }


  decodeTag(json: Tag): SearchResult {
    return {
      id: json.id,
      description: json.description,
    };
  }

  public changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  public changeTypeaheadNoResults(e: boolean): void {
    this.typeaheadNoResults = e;
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    console.log('search space' + this.searchString);
    if (this.searchString.startsWith('#')) {
      this.tagSelected.emit(e.item);
    }
    else {
      this.contactSelected.emit(e.item);
    }
  }
}
