import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// #translate #local #locale #ngx-translate #internationalization #i18n
@Pipe({
  name: 'localizedDate',
  pure: false, // The localizedDate can not be pure. The main purpose of this pipe is to avoid passing the current locale as input. Therefore, it has to be an impure pipe to listen to the current locale changes triggered by other components. For the same reason, the translate pipe from ngx-translate is impure as well.
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translateService: TranslateService) {}

  transform(value: Date, format = 'mediumDate'): string {
    const datePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(value, format) || 'Invalid Date or Format';
  }
}
