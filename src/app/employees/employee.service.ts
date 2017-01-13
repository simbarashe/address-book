import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Employee } from './employee'
import { Tag } from './tag'
import { Contact } from './contact'
import { Configuration } from './../shared/app.constants'

let employees: Employee[] = [
  {
    id: 1, firstName: 'Simba', lastName: 'Sithole', companyName: 'Curative', designation: 'Director',
    communicationDetails: [
      { id: 1, type: 'email', detail: 'test1@email.com' },
      { id: 2, type: 'phone', detail: '071 565 6872' },
    ], tags: [
      { id: 1, description: 'Consulant', isAssigned: false },
      { id: 2, description: 'Mentor', isAssigned: false },
    ]
  },
  {
    id: 2, firstName: 'Joe', lastName: 'Shirimani', companyName: 'Curative', designation: 'Administrator',
    communicationDetails: [
      { id: 1, type: 'email', detail: 'test2@email.com' },
      { id: 2, type: 'phone', detail: '072 565 6872' },
    ], tags: [
      { id: 1, description: 'Consulant', isAssigned: false },
      { id: 3, description: 'Motivational Speaker', isAssigned: false },
    ]
  },
  {
    id: 3, firstName: 'Tatenda', lastName: 'Sithole', companyName: 'Curative', designation: 'Asistant Manager',
    communicationDetails: [
      { id: 1, type: 'email', detail: 'test3@email.com' },
      { id: 2, type: 'phone', detail: '073 565 6872' },
    ], tags: [
    ]
  },
  {
    id: 4, firstName: 'Pansy', lastName: 'Sithole', companyName: 'Curative', designation: 'Director',
    communicationDetails: [
      { id: 1, type: 'email', detail: 'test4@email.com' },
      { id: 2, type: 'phone', detail: '074 565 6872' },
    ], tags: [

      { id: 3, description: 'Motivational Speaker', isAssigned: false },
    ]
  },
];

@Injectable()
export class EmployeeService {
  baseUrl: string = this._configuration.Server + 'api/persons'
  employeesUrl: string = this.baseUrl + '/employees'
  employeesByIdUrl: string = this.baseUrl + '/employeesbyid'  
  employeesByTagIdUrl: string = this.baseUrl + '/employeesbytagid'    
  newTagUrl: string = this.baseUrl
  tagsUrl: string = this._configuration.Server + 'api/tags'
  headers: Headers;
  options: RequestOptions;

  constructor(private _http: Http, private _configuration: Configuration) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  get(query = ''): Promise<Employee[]> {
    let url = this.employeesUrl;
    if (query) {
      url += '/' + query;
    }
    return this._http.get(url)
      .toPromise()
      .then(response => this.extractArray(response))
      .catch(this.handleErrorPromise);
  }

  getEmployeesById(query:number): Promise<Employee[]> {
    let url = this.employeesByIdUrl;
    if (query) {
      url += '/' + query;
    }
    return this._http.get(url)
      .toPromise()
      .then(response => this.extractArray(response))
      .catch(this.handleErrorPromise);
  }

    getEmployeesByTagId(query:number): Promise<Employee[]> {
    let url = this.employeesByTagIdUrl;
    if (query) {
      url += '/' + query;
    }
    return this._http.get(url)
      .toPromise()
      .then(response => this.extractArray(response))
      .catch(this.handleErrorPromise);
  }

  getTags(query = ''): Promise<Tag[]> {
    let url = this.tagsUrl;
    if (query) {
      url += '/' + query;
    }
    return this._http.get(url)
      .toPromise()
      .then(response => this.extractArray(response))
      .catch(this.handleErrorPromise);
  }

  addTag(description: string): Promise<void> {
    let tag = { description: description, isAssigned: false };
    let body = JSON.stringify(tag);
    return this._http.post(this.newTagUrl, body, this.options)
      .toPromise()
      .catch(this.handleErrorPromise);
  }

  updateTag(tag: Tag): Promise<void> {
    let body = JSON.stringify(tag);
    return this._http.put(this.newTagUrl, body, this.options)
      .toPromise()
      .then(response => this.extractArray(response))
      .catch(this.handleErrorPromise);
  }

  deleteTag(id: number): Promise<void> {
    return this._http.delete(this.baseUrl + '/' + id, this.options)
      .toPromise()
      .then(response => this.extractArray(response))
      .catch(this.handleErrorPromise);
  }

  protected extractArray(res: Response, showprogress: boolean = true) {
    let data = res.json();
    return data || [];
  }

  protected handleErrorPromise(error: any): Promise<void> {
    try {
      error = JSON.parse(error._body);
    } catch (e) {
    }

    let errMsg = error.errorMessage
      ? error.errorMessage
      : error.message
        ? error.message
        : error._body
          ? error._body
          : error.status
            ? `${error.status} - ${error.statusText}`
            : 'unknown server error';

    console.error(errMsg);
    return Promise.reject(errMsg);
  }

}
