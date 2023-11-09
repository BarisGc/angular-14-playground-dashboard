import { Injectable } from '@angular/core';

export class SomeserviceService {
  someServiceNo = 0;
  constructor() {
    this.someServiceNo++; // always 1 since it is a new instance for each component
  }
}
