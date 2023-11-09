import { NgClass } from '@angular/common';
import {
  Directive,
  IterableDiffers,
  KeyValueDiffers,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appExtendsNgclass]',
})
export class ExtendsNgclassDirective extends NgClass {
  constructor(
    _iterableDiffers: IterableDiffers,
    _keyValueDiffers: KeyValueDiffers,
    _ngEl: ElementRef,
    _renderer: Renderer2
  ) {
    super(_iterableDiffers, _keyValueDiffers, _ngEl, _renderer);
  }

  setClass() {
    this.ngClass = 'foo';

    // or
    this.ngClass = ['asd', 'abc', 'def'];

    // or
    this.ngClass = {
      underline: true,
      bold: true,
      italic: true,
      pretty: false,
    };
  }

  ngOnInit() {
    this.setClass();
  }
}
