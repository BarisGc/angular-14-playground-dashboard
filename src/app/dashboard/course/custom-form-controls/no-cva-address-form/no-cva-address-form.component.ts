import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormGroupDirective,
  FormControlDirective,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-no-cva-address-form',
  templateUrl: './no-cva-address-form.component.html',
  styleUrls: ['./no-cva-address-form.component.scss'],
})
export class NoCvaAddressFormComponent {
  @Input()
  legend!: string;

  @Input() formGroupName!: string;
  @Input() formFromParent!: FormGroup;

  onChangeSub!: Subscription;

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rootFormGroup: FormGroupDirective,
  ) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    console.log("nocvarootFormGroup",this.rootFormGroup);
    console.log("nocvaformFromParent",this.formFromParent);

  }

}
