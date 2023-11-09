import { FormGroup, FormControl } from '@angular/forms';

export interface PurchaseFormModel
  extends FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    amount: FormControl<number>;
  }> {}
