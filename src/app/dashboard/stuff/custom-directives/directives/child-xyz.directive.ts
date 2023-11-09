import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appChildXyz]'
})
export class ChildXyzDirective {

  constructor(public elementRef: ElementRef) { }

}
