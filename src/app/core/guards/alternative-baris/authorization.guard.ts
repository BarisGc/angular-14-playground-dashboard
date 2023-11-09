import { tap, first, map } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { AuthBarisService } from '../../services/alternative-baris/auth-baris.service';
import { Observable, of } from 'rxjs';
export function AdminAuthorizationGuard(...roles: string[]): CanActivateFn {
  return (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> => {
    const authBarisService = inject(AuthBarisService);
    const router = inject(Router);
    return authBarisService.user$.pipe(
      map((user) => {
        let isOneOfAnUserRolesAuthorizated = user?.roles.filter((role) =>
          roles.includes(role)
        );
        let urlTree = router.parseUrl('dashboard/authorization-error');
        return isOneOfAnUserRolesAuthorizated.length>0 ? true : urlTree;
      }),
      first()
    );
    // return authBarisService.user$.pipe(
    //   map((user) => {
    //     let isOneOfAnUserRolesAuthorizated = user.roles.filter((role) =>
    //       roles.includes(role)
    //     );
    //     return isOneOfAnUserRolesAuthorizated ? true : false;
    //   }),
    //   first(),
    //   tap((allowed) => {
    //     if (!allowed) {
    //       router.navigateByUrl('/');
    //     }
    //   })
    // );
  };
}
