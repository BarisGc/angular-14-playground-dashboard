import { Injectable } from '@angular/core';
import { ChildService } from './child.service';
import { Child2Service } from './child2.service';

/**
 * keywords: singleton, inject a service into another service
 *
 * @export
 * @class ParentService
 */
@Injectable({
  providedIn: 'root',
})
export class ParentService {
  parentServiceData = 'abc';
  constructor(
    private childService: ChildService,
    public child2Service: Child2Service
    // note: While providedIn: 'root' approach is tree shakable but no isolated, providers:[] approach is isolated but not treeshakable
    // caution: if you inject a service into another service, you have to provide both services in the module where you use them, anyway.
    // note: no need to add @Injectable() to the service you inject into another service if you use the providing approach below
    // {
    //   providers: [ParentService, ChildService, Child2Service]
    // }

    // alternative and better approach(singleton)
    // @Injectable({
    //   providedIn: 'root',
    // })

    // In parent and children
  ) {}

  do() {
    this.childService.doSomethingFromChildService();
    console.log('after ChildService function');
  }
}
