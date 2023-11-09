import {
  ContentChildren,
  Directive,
  QueryList,
  Renderer2,
} from '@angular/core';
import { ChildAbcDirective } from './child-abc.directive';
import { ChildXyzDirective } from './child-xyz.directive';

// #nesteddirective #nested directive #childdirective #parentdirective
@Directive({
  selector: '[appParent]',
})
export class ParentDirective {
  // #nesteddirective  #nested directive #parentdirective #parent directive
  constructor(private renderer: Renderer2) {}
  @ContentChildren(ChildXyzDirective, { descendants: true })
  xyzChildren!: QueryList<ChildXyzDirective>;

  @ContentChildren(ChildAbcDirective, { descendants: true })
  abcChildren!: QueryList<ChildAbcDirective>;

  ngAfterContentInit() {
    this.abcChildren.forEach((e: any) => {
      console.log('e', e);
      this.renderer.setStyle(e.elementRef.nativeElement, 'background', 'red');
    });

    this.xyzChildren.forEach((e: any) => {
      console.log('e', e);
      this.renderer.setStyle(e.elementRef.nativeElement, 'background', 'green');
    });
  }
}
