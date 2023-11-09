import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[appChildAbc]'
})
export class ChildAbcDirective {

  constructor(public elementRef: ElementRef) { }

}
