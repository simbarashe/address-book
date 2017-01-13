/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InputOuputComponent } from './input-ouput.component';

describe('InputOuputComponent', () => {
  let component: InputOuputComponent;
  let fixture: ComponentFixture<InputOuputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputOuputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputOuputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
