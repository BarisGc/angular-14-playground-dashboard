import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective {
  @Input() appAutoFocus!: boolean;
  constructor(private el: ElementRef) {
    console.log('appautofocus constructor');
  }

  // #directive lifecycle #lifecycle #autofocus #auto focus
  ngOnInit() {
    console.log('appautofocus ngOnInit');
  }
  ngAfterContentInit() {
    console.log('appautofocus ngAfterContentInit');
  }

  ngAfterViewInit() {
    console.log('appautofocus ngAfterViewInit');
    this.el.nativeElement.focus();
  }
}
