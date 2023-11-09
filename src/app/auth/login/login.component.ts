import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, generate } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { createPasswordStrengthValidator } from 'src/app/validators/password-strength.validator';
import { AuthBarisService } from 'src/app/core/services/alternative-baris/auth-baris.service';
import { SwPush } from '@angular/service-worker';
import { NewsletterService } from 'src/app/core/services/alternative-baris/newsletter.service';

/**
 * @keywords Reactive Forms vs Template Driven Forms (TDF; basic features, custom validation included)
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  // Starter Template Owner Approach
  // form!: FormGroup;
  // message!: string;
  // loginSubscription!: Subscription;
  // loginLoading = false;
  // static path = () => ['login'];

  // constructor(
  //   private authService: AuthService,
  //   public formBuilder: FormBuilder,
  //   private router: Router,
  //   public snackBar: MatSnackBar
  // ) {
  //   this.initFormBuilder();
  // }

  // loginUser() {
  //   this.loginLoading = true;

  //   this.loginSubscription = this.authService
  //     .loginWithUserCredentials(this.form.value.email, this.form.value.password)
  //     .pipe(finalize(() => (this.loginLoading = false)))
  //     .subscribe(
  //       (data) => {
  //         this.router.navigate(DashboardComponent.path());
  //       },
  //       (error) => {
  //         this.snackBar.open('Access Denied', '', {
  //           duration: 3000,
  //           horizontalPosition: 'end',
  //           verticalPosition: 'bottom',
  //         });
  //       }
  //     );
  // }

  // private initFormBuilder() {
  //   this.form = this.formBuilder.group({
  //     email: [
  //       'john.doe@mailinator.com',
  //       [Validators.required, Validators.email],
  //     ],
  //     password: ['@ngular2+', Validators.required],
  //   });
  // }

  // #reactiveforms APPROACH
  loginLoading = false;

  // //alternative way of defining form control
  // email = new FormControl('', {
  //   validators: [Validators.required, Validators.email],
  //   updateOn: 'blur',
  // });
  // // preparing from group without form builder api
  // form = new FormGroup({
  //   email: this.email,
  //   password: new FormControl('', {
  //     validators: [Validators.required, Validators.minLength(8), createPasswordStrengthValidator()],
  //   }),
  // });

  form =
    /*  In order to make sure that you use type inference and type forms to its maximum effect,
      make sure to always declare your variables like this without explicitly saying that this is a form group
      led type inference.
      Everything works out of the box and you don't have to do anything special in order to benefit from this
      extra type safety. Other than avoiding the common pitfall of assigning an explicit type to your form variable.
  */
    this.formBuilder.group({
      email: [
        'admin@gmail.com',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      // email: this.formBuilder.nonNullable.control('', {
      //   validators: [Validators.required, Validators.email],
      //   updateOn: 'blur',
      // }),
      password: [
        'Password10',
        [
          Validators.required,
          Validators.minLength(8),
          createPasswordStrengthValidator(),
        ],
      ],
    });

  get _email() {
    return this.form.get('email') as FormControl;
    // alternative way of getting form control
    // return this.form.controls['email'] as FormControl;
  }

  get _password() {
    return this.form.get('password') as FormControl;
    // alternative way of getting form control
    // return this.form.controls['email'] as FormControl;
  }

  loginSubscription!: Subscription;
  static path = () => ['login'];

  sub!: PushSubscription;

  readonly VAPID_PUBLIC_KEY =
    'BDDRRInx8sHnNtPjBGoceWlYOQa5w5a-zi-rTHXPUmqkjr7OZjFMNPm-Acyn54euhNBXLjtNK40p_Hi6FTGzWxc';

  constructor(
    public snackBar: MatSnackBar,
    private authBarisService: AuthBarisService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private swPush: SwPush,
    private newsletterService: NewsletterService // If all controls in your form are non nullable, you can use the non nullable form builder. Therefore, you can use reqular syntax // ex: email: ['', { validators: [Validators.required, Validators.email], updateOn: 'blur' }] // private nonNullableFormBuilder: NonNullableFormBuilder,
  ) {
    // Notice that using the form builder, we could also define an individual control.
    // So we're using this control API.
    // We simply will have to pass in here the initial form value and here we can pass an array of form validators
    // or if we prefer, we can also pass in here a configuration object containing one of these free properties.
    // formBuilder.control('', {
    //   validators: [Validators.required],
    // });
  }

  loginUser() {
    this.loginLoading = true;

    this.loginSubscription = this.authBarisService
      .login(this._email.value, this._password.value)
      .pipe(finalize(() => (this.loginLoading = false)))
      .subscribe({
        next: (data) => {
          this.router.navigate(DashboardComponent.path());
        },
        error: (error) => {
          this.snackBar.open('Access Denied', '', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
          });
        },
      });
  }

  subscribeToNotifications() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {
        this.sub = sub;
        console.log('Notification Subscription: ', sub);

        this.newsletterService.addPushSubscriber(sub).subscribe({
          next: (data) => {
            console.log('Sent push subscription object to server', data);
          },
          error: (error) => {
            console.log(
              'Could not send subscription object to server, reason: ',
              error
            );
          },
        });
      })
      .catch((err) => {
        console.error('Could not subscribe to notifications', err);
      });
    // terminal:
    // npm i web-push -g
    // web-push generate-vapid-keys --json
    // {"publicKey":"BDDRRInx8sHnNtPjBGoceWlYOQa5w5a-zi-rTHXPUmqkjr7OZjFMNPm-Acyn54euhNBXLjtNK40p_Hi6FTGzWxc","privateKey":"qbaKyXWLQpNZinnp5ZQMWcTwo_ggs7SzVENh4-ANjLk"}
    // note:
    // This is not mandatory.
    // But I would recommend you to create a vape, a V for your server, because this way, Chrome, or in this case, Google, the company that is running Chrome, can clearly identify your server in a stable way. Over time. They might contact you if your application is accidentally emitting a lot of notifications due to a bug. They can also use the identifier to the. Behavioral patterns to your application and eventually give priority to your push notifications over servers that are completely anonymous. So bottom line is that although it's not mandatory, it's highly recommended that you create a unique identifier for your server in order to make sure that you get the best chance of the notifications to actually be displayed to the user with the vapidly generated.
  }

  sendNewsletter() {
    console.log('Sending Newsletter to all Subcribers ...'),
      this.newsletterService
        .send()
        .subscribe((data) => console.log('Newsletter sent successfully', data));
  }

  // #TDF APPROACH #templatedriven
  // emailTDFValue = {
  //   email: '',
  //   password: ''
  // }

  // loginUserTdf(tdfForm:NgForm, submit:Event) {
  //   console.log('tdfForm Submitted',tdfForm)
  //   console.log('tdfForm submit event',submit)
  // }

  // byEmailTDFChange(changeEvent: any) {
  // console.log('byEmailTDFChange',changeEvent)}
}
