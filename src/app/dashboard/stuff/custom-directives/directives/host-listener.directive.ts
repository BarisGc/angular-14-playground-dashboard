import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHostListener]',
})
export class HostListenerDirective {
  // #hostlistener #host listener #customdirective #custom directive
  @HostListener('mouseenter') private onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', 'violet');
  }

  @HostListener('mouseleave') private onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      'transparent'
    );
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}
}
