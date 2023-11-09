import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { catchError, finalize, of, map, tap } from 'rxjs';

/**
 * Keywords: #file, #upload, #fileUpload, #custom form controls
 *
 * Each firm property is going to have a control value accessor associated to it. The association is made by directives that are part of the angular forms module. Some are built in and some are custom like the case of our file upload component, so each property has a control value accessor. In order to make the component behave as though it were a native input (and thus, a true custom form control), we need to tell Angular how to do a few things:
 *
 * @function writeValue(): ( model -> view ) Write a value to the input, allows Angular to update the model, this writeValue is called by Angular when the value of the control is set either by a parent component or form. When ngModel or formControl value changes, this function gets called and the latest value is passed in as the argument to the function
 *
 * Angular will call this method with the value in one of the following cases:
 *
 * 1) When you instantiate a new FormControl
 *
 * 2) When you call this.control.patchValue/setValue(value)
 *
 * @function onChange(): the callback function to register on UI change
 *
 * @function onTouched(): the callback function to register on UI touch
 *
 * @function registerOnChange(): ( view -> model ) Set the function to be called when the control receives a change event. Angular provides you with a function and asks you to call it whenever there is a change in your component with the new value so that it can update the control.
 *
 * we get access to a function in the argument that can be saved to a local variable. Then this function can be called when there are any changes in the value of our custom form control
 *
 * @function registerOnTouched(): Register a function to tell Angular when the input has been touched. When    the element is touched, this method will get called
 *
 * we get access to another function that can be used to update the state of the form to touched. So when the user interacts with our custom form element, we can call the saved function to let Angular know that the element has been interacted with
 *
 * @function setDisabledState(): this function will be called by the forms API when the disabled state is changed. We can get the current state and update the state of the custom form control.
 *
 * Angular will call this method with the value in one of the following cases:
 *
 * 1) When you instantiate a new FormControl with the disabled property set to true. FormControl({value: '', disabled: true})
 *
 * 2) When you call control.disable() or when you call control.enable() after your already called control.disable() at least once.
 *
 */
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent, // forwardRef(() => FileUploadComponent) if providing our component before its declaration
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent
  implements OnInit, ControlValueAccessor, Validator
{
  @Input() requiredFileType!: string;

  fileName = '';

  isFileExtensionValid!: boolean;

  fileUploadError = false;

  fileUploadSuccess = false;

  uploadProgress!: number | null;

  isDisabled: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  fileExtensionChecker() {
    const extensions = ['jpg', 'jpeg', 'bmp', 'gif', 'png'];
    let splittedFileName = this.fileName.split('.');
    let extension = splittedFileName[splittedFileName.length - 1];

    if (!extensions.includes(extension)) {
      this.isFileExtensionValid = false;
    } else this.isFileExtensionValid = true;
  }

  byClickingFileInput(fileUpload: HTMLInputElement) {
    // this._onTouched(); no need here
    fileUpload.click();
  }

  byFileSelected(
    // caution: ChangeEvent is for React, not Angular. You can use Event instead
    e: Event
  ) {
    // advice: Events are propagating, target could be other elements in different type. Better to use e.currentTarget, which IS a HTMLInputElement
    const target = e.target as HTMLInputElement;
    // advice: You do not need to cast the file. When you cast the HTMLInputElement, it automatically infers the target.files type. Plus, it's dangerous to go around casting everything. The lesser you cast, the better
    const file = target.files![0];
    if (file) {
      this.fileName = file.name;

      // note: You can use the FormData API(standard browser functionality) to send files to the server. The FormData interface provides a way to construct a set of key/value pairs representing form fields and their values, which can be sent using the fetch() or XMLHttpRequest.send() method. To sum up, the form data object can be used to create a form payload manually using the FormData API
      const formData = new FormData();

      // note: The append() method appends a new value onto an existing key inside a FormData object, or adds the key if it does not already exist.
      formData.append('thumbnail', file);

      // do not post if the file extension is invalid
      this.fileExtensionChecker();
      this.onValidatorChange();
      if (this.isFileExtensionValid) {
        this.http
          .post('/api/thumbnail-upload', formData, {
            reportProgress: true,
            observe: 'events',
          })
          .pipe(
            tap(() => (this.fileUploadError = false)),
            catchError((err) => {
              this.fileUploadError = true;
              return of(err);
            }),
            // semi-alternative: catchError(err => {
            //   this.fileUploadError = true;
            //   this.handleError(err))
            // }
            finalize(() => {
              this.uploadProgress = null;
              this._onTouched();
              this._onChange(this.fileName);
              this.onValidatorChange();
            })
          )
          .subscribe((event) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.uploadProgress = Math.round(
                (100 * event.loaded) / event.total
              );
            } else if (event.type === HttpEventType.Response) {
              this.fileUploadSuccess = true;
            }
          });
      } else {
        this._onTouched();
        this.onValidatorChange();
      }
    }
  }

  /*
    Caution: These FOUR methods are meant to be called by the angular forms module only, are not meant to be called by as manually inside our component. So if you see code where these methods are being called manually, that is probably a mistake.
   */

  // First Method
  writeValue(value: any): void {
    this.fileName = value;
  }

  // The Second Method
  registerOnChange(fn: (fileName: string) => void): void {
    // Angular does not know that the value has changed from our component, so we need to update it with the new value.
    this._onChange = fn;
  }
  private _onChange = (fileName: string): void => {}; // or => undefined

  // The Third Method
  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
  private _onTouched = () => {}; // or => undefined

  // The Fourth Method
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // note: member of _Validator_ class
  private onValidatorChange = () => {}; // or => undefined
  registerOnValidatorChange(onValidatorChange: () => void): void {
    this.onValidatorChange = onValidatorChange;
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    // required
    let errors: any = {
      // requiredFileType: this.requiredFileType, // image/png note: i do not know where to use 'requiredFileType' , no example by the angular university instructor
      required: true,
    };

    if (this.fileName) {
      // wrongFileType
      if (this.isFileExtensionValid === false) {
        errors.wrongFileType = true;
      }
    }

    if (!errors.wrongFileType && this.fileUploadSuccess) {
      return null;
    }

    // uploadFailed
    if (this.fileUploadError) {
      errors = {
        uploadFailed: true,
      };
    }

    return errors;
  }

  // handleError(error:any) {
  //   this.router.navigateByUrl('/404');
  //   return throwError(error);
  // }
}
// caution:
// When you create a Control i.e. any type extending AbstractControl such as FormGroup, FormControl, ArrayControl…

// They will be marked as dirty by default (unless of course you made your own implementation).

// Therefore, when you create such a Control and assign them validators, those validators will be triggered at once.

// For instance, assuming ErrorOnValidate is a validator which will always return an error, the following formGroup will immediately hold the errors returned by the validator.

// const formGroup: FormGroup = new FormGroup(
//       {
//         key: new FormControl('value'),
//       },
//       {
//         validators: [ErrorOnValidate],
//       }
//     );
// console.log(formGroup.valid); /// false
// How to prevent this behaviour ?

// You need to create the form first, then set it as pristine and then only attach validators to that one.

// const formGroup: FormGroup = new FormGroup(
//       {
//         key: new FormControl('value'),
//       }
//     );

// formGroup.markAsPristine();

// formGroup.setValidators([ErrorOnValidate]);

// console.log(formGroup.valid); /// true

// In this way, the formGroup will run the validator (and therefore in this example hold the validator's error) when a controller is touched.

// But… Now you do have a FormGroup with values and validators which will not do anything until it is touched. However, as soon as you will bind this FormGroup with a input, the input will touch the control and therefore trigger the validations, meaning all this effort is lost.

// An alternative is to create a FormControl without any validators and to add those to the form only only once the view did init.

// ngAfterViewInit(): void {
//     this.formGroup.setValidators([ErrorOnValidate])
// }
