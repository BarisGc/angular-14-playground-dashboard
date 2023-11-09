import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Keywords: custom form controls
 *
 * hint: I recommend you to stop giving default values to these control value accessor handlers
 */
@Component({
  selector: 'app-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // useExisting: forwardRef(() => RatingInputComponent),
      useExisting: RatingInputComponent,
      multi: true,
    },
  ],
})
export class RatingInputComponent implements OnInit, ControlValueAccessor {
  @Input() stars = [0, 1, 2, 3, 4]; // default is 5 stars
  @Input() messages!: Array<string>; // optional text descriptors for each rating value
  @Input() label!: string; // optional Label
  @Input() ratingInputValue: number | null = null; // un-touched value should be null
  displayText!: string | undefined;
  disabled!: boolean;
  ratingText!: string | undefined;
  constructor(private eRef: ElementRef, private renderer: Renderer2, private rootFormGroup: FormGroupDirective ) {}

  ngOnInit(): void {
  }

  // ControlValueAccessor methods
  writeValue(val: any): void {
    this.ratingInputValue = val;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  private _onChange = (ratingInputValue: any) => {};

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  private _onTouched = () => {};

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  setRating(rating: any) {
    if (this.disabled) {
      return;
    }
    // stars & messages arrays are 0 based
    let oldVal = rating;
    this.ratingInputValue = oldVal + 1;

    // set text to display (if it exists on the chosen star object)
    this.ratingText = this.messages[rating] ? this.messages[rating] : undefined;

    // set the value for the control
    this._onChange(this.ratingInputValue);
    this._onTouched();

    // SVG STAR & DOM STUFF
    const svgArr = this.eRef.nativeElement.querySelectorAll('svg.star');

    for (let i = 0, j = svgArr.length; i < j; i++) {
      if (i <= rating) {
        this.renderer.addClass(svgArr[i], 'active');
      } else {
        this.renderer.removeClass(svgArr[i], 'active');
      }
    }
  }

  // caution:
  // if there's a value on init we need to apply it to the stars programmatically
  // eRef has no DOM on init. We need to work with our view within AfterViewInit
  ngAfterViewInit() {
    // advice: I recommend you to stop giving default values to these control value accessor handlers because this way, you will actually get more meaningful errors (like Error: this.onChange is not a function) that should trigger this alarm for you and let you know that you try to use the handler before it was registered
    if (this.ratingInputValue !== null) {
      let initialValue = this.ratingInputValue;
      setTimeout(() => {
        this.setRating(--initialValue);
      });
    }
  }
}
