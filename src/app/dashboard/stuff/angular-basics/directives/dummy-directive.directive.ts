import { Directive } from '@angular/core';

@Directive({
  selector: '[appDummyDirective]',
})
export class DummyDirectiveDirective {
  dummyDirectiveNo = 1;
  constructor() {}
}
