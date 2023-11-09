import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  hasUnsavedChanges(): boolean | Observable<boolean>;
}

export const CanDeactivateState = {
  defendAgainstBrowserBackButton: false,
};
/**
 * navigasyon değişiminde form değişikliklerini kontrol edip, değişiklik varsa uyaran guard.
 *
 * Back button'a basıldığında da çalışır. İlave, ayara gerek yok.
 */
@Injectable({
  providedIn: 'root',
})
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate>
{
  canDeactivate(
    component: ComponentCanDeactivate
  ): boolean | Observable<boolean> {
    if (component.hasUnsavedChanges()) return true;
    else
      return confirm(
        'Kaydedilmemiş değişiklikleriniz var! Devam etmek istiyor musunuz?'
      )
        ? true
        : false;
    // return (
    //   component?.canDeactivate() ||
    //   this.matDialog
    //     .open<ConfirmationComponent, void, boolean>(ConfirmationComponent, {
    //       disableClose: true,
    //     })
    //     .afterClosed()
    //     .pipe(
    //       tap((confirmed) => {
    //         if (
    //           (!confirmed && CanDeactivateState.defendAgainstBrowserBackButton)
    //         ) {
    //           history.pushState(null, '', '');
    //         }
    //       })
    //     )
    // );
  }
}
