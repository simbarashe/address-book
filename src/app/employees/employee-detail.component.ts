import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, Renderer } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Employee } from './employee'
import { Tag } from './tag'

import { EmployeeService } from './employee.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
})
export class EmployeeDetailComponent implements OnInit {

  changeDetection: ChangeDetectionStrategy.OnPush
  @Input()
  employee: Employee;

  @Output() employeeChanged = new EventEmitter();
  @Output() tagAdded = new EventEmitter();
  @Output() tagDeleted = new EventEmitter();
  @Output() tagsChanged = new EventEmitter();
  public disabled: boolean = false;
  public status: { isopen: boolean } = { isopen: false };
  public items: string[] = ['The first choice!',
    'And another choice for you.', 'but wait! A third!'];
  @Input()
  public tags: Tag[] = [];
  public employeeTags: Tag[] = [];
  backgroundColor: string = ''
  newTag: string = '';
  anyTagsModified: boolean = false;

  employeeSelected() {
    this.employeeChanged.emit(this.employee); // emit the selected color.
  }

  addTag() {
    this.employeeService.addTag(this.newTag)
    this.anyTagsModified = true;
    this.tagAdded.emit(this.newTag); // emit the selected color.    
    this._notificationService.publishMessage(this.newTag);
    this.newTag = '';
  }

  clearBackground() {
    this.backgroundColor = '';
  }

  activateBackground() {
    this.backgroundColor = 'active';
  }

  updateTag(tag: Tag): void {
    this.employeeService.updateTag(tag)
    this.anyTagsModified = true;
  }

  deleteTag(id: number): void {
    this.employeeService.deleteTag(id)
    this.tags = this.tags.filter(x => {
      return x.id != id;
    })
    this.tagAdded.emit(id);
    this.anyTagsModified = true;
  }

  public toggleDropdown($event: MouseEvent): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  public toggled(open: boolean): void {
    if (!open && this.anyTagsModified) {
      this.tagsChanged.emit()
      this.anyTagsModified = false;
    }
  }

  getTags() {
    return this.employeeService.getTags().then(tags => {
      this.employee.tags.forEach((employeeTag) => {  
        tags.filter(element => {
          return element.id == employeeTag.tagId;
        }).forEach((assignedTag) => {
          assignedTag.isAssigned = true;
        });
      })
      this.tags = tags;
    });
  }

  constructor(private employeeService: EmployeeService,
    private changeDetector: ChangeDetectorRef,
    private _notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getTags();
  }

}
