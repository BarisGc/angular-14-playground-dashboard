import { Directive, Input } from '@angular/core';
import { MyEasyBoxComponent } from '../my-easy-box/my-easy-box.component';

// #viewchildfromdirective #viewchilddirective
// caution: Since the component is not the child of the directive, the child selector will not work.

// Instead, use references:

// <my-easybox #myBox></my-easybox>
// <p [myEasyBox]="myBox" data-href="URL">My Directive</p>
// @Input('myEasyBox') myComponent: EasyBoxComponent;
@Directive({
  selector: '[appViewChildFromDirectives]',
})
export class ViewChildFromDirectivesDirective {
  @Input() myEasyBoxComponent!: MyEasyBoxComponent;

  constructor() {}

  ngAfterViewInit(): void {
    console.log('appMyEasyBox', this.myEasyBoxComponent.test);
  }
}
