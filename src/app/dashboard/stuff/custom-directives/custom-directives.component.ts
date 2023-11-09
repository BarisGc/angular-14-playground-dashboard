import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { RbacAllowDirective } from './directives/rbac-allow.directive';

@Component({
  selector: 'app-custom-directives',
  templateUrl: './custom-directives.component.html',
  styleUrls: ['./custom-directives.component.scss'],
})
export class CustomDirectivesComponent implements OnInit {
  // #createEmbeddedView via directive #rbac
  @ViewChild(RbacAllowDirective, { read: ViewContainerRef })
  rbacAllowContainer!: ViewContainerRef;

  rbacAllowSelection = 'admin';
  items = ['Lessons', 'Admin', 'Sign Up', 'Login', 'Logout'];

  // #HostBinding
  firstParentProperty = true;
  secondParentProperty = false;

  constructor(
    // Elements are pretty much everything we see (or not) on a web page. For example, input fields, links, images, and other things that may not be visible are all elements.

    // The ElementRef class is a simple wrapper for native elements, which are usually DOM elements in the browser. It provides a way to access the nativeElement object, exposing all the methods and properties of the associated native element.

    // while a component can get access to it's host element through DI, the ViewChild decorator is used most often to get a reference to a DOM element in their view (template). No need to use this, instead use viewchild
    private hostElement: ElementRef<HTMLElement>, //<HTMLInputElement> etc. which enables IntelliSense
    // private templateRef: TemplateRef<any>, you can not use here
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {
    console.log('hostElement', this.hostElement.nativeElement.outerHTML);
    console.log('viewContainerRef', this.viewContainerRef);
  }

  ngAfterViewInit() {
    console.log('rbacAllowContainer', this.rbacAllowContainer);
  }
}
