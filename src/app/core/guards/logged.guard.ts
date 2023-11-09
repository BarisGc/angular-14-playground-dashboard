import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthBarisService } from '../services/alternative-baris/auth-baris.service';

import { AuthService } from '../services/auth.service';

@Injectable()
export class Logged implements Resolve<any> {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authBarisService: AuthBarisService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    /*
    original code
    */

    // if (this.authService.isLogged()) {
    //   this.router.navigate(['/dashboard']);
    // }
    if (this.authBarisService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }
}
