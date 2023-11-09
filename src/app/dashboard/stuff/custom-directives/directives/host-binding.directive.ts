import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHostBinding]',
})
export class HostBindingDirective implements OnInit, OnChanges, AfterViewInit {
  // #hostbinding #host binding
  // Whenever we change the value of the border or class, the angular will update the border or class property of the host element.
  @HostBinding('style.border') border!: string;
  @HostBinding('class') class!: string;

  // alternative syntax: with getter like examples below
  @HostBinding('class.highlight') get hasHighlight() {
    return true;
  }
  @HostBinding('class.box') get hasBox() {
    return false;
  }

  // #Two-way binding in directives #twoway
  @Input() first!: boolean;
  @Input() second!: boolean;

  @Output() firstChange = new EventEmitter<boolean>();
  @Output() secondChange = new EventEmitter<boolean>();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit() {
    this.border = '5px solid blue';
    this.class = 'highlight box';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.firstChange.emit(false);
      this.secondChange.emit(!this.second);
    }, 5000);
  }
}
