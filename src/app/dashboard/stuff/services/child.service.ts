import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChildService {
  child1ServiceData = 'child1ServiceData';
  constructor() {}
  doSomethingFromChildService() {
    console.log('ChildService just did something');
  }
}
