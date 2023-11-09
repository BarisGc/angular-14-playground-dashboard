import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  API_URL,
  APP_CONFIG,
  PRODUCT_SERVICE,
  USE_BETTER,
} from '../tokens/tokens';
import { ProductService } from '../service/product.service';
import { LoggerService } from '../service/logger.service';
import { BetterProductService } from '../service/better-product.service';

const CONFIG = {
  apiUrl: 'http://my.api.com',
  fake: true,
  title: 'Injection Token Example',
};

export function resolveProductService(
  USE_BETTER: boolean,
  LoggerService: LoggerService
) {
  return USE_BETTER
    ? new BetterProductService(LoggerService)
    : new ProductService();
}
@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss'],
  providers: [
    // #useclass, #usefactory, #usevalue
    { provide: PRODUCT_SERVICE, useClass: ProductService },
    { provide: USE_BETTER, useValue: true },
    { provide: API_URL, useValue: 'http://SomeEndPoint.com/api' },
    { provide: APP_CONFIG, useValue: CONFIG },
    { provide: LoggerService, useClass: LoggerService },
    {
      provide: 'ProductServiceByUseFactory',
      useFactory: (USE_BETTER: boolean, LoggerService: LoggerService) =>
        USE_BETTER
          ? new BetterProductService(LoggerService)
          : new ProductService(),
      //useFactory: resolveProductService,
      deps: [USE_BETTER, LoggerService],
    },
    {
      provide: 'FuncByUseFactory',
      useFactory: () => {
        return 'hello';
      },
    },
    {
      provide: 'funcByUseValue',
      useValue: () => {
        return 'hello';
      },
    },
    {
      provide: 'funcByUseExist',
      useExisting: 'FuncByUseFactory',
    },
  ],
})
export class BaseComponentComponent {
  constructor(public router: Router, public route: ActivatedRoute) {}
  openPage(routename: string) {
    this.router.navigate(['../', routename], { relativeTo: this.route });
  }
}
