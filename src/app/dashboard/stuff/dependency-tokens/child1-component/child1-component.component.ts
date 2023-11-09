import { Component, Inject, OnInit, inject } from '@angular/core';
import { BaseComponentComponent } from '../base-component/base-component.component';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterEvent,
} from '@angular/router';
import { filter, tap } from 'rxjs';
import {
  API_URL,
  APP_CONFIG,
  PRODUCT_SERVICE,
  USE_BETTER,
} from '../tokens/tokens';
import { Product } from '../service/product';
import { ProductService } from '../service/product.service';
import { AppConfig } from '../tokens/app-config';

function getUrl(): string {
  /*
   * note:
   * we did not have to explicitly define the type of the token property
   * type "string" is inferred
   */
  const route = inject(API_URL);
  return route;
}
@Component({
  selector: 'app-child1-component',
  templateUrl: './child1-component.component.html',
  styleUrls: ['./child1-component.component.scss'],
})
export class Child1ComponentComponent
  extends BaseComponentComponent
  implements OnInit
{
  apiUrlViaConstructor!: string;
  apiUrlViaInjectorFunction!: string;

  products!: Product[];

  constructor(
    // caution
    // @Inject decorator is only needed for injecting primitives.
    // The primitive types are number, string, boolean, bigint, symbol, null, undefined.
    // @Inject(BaseComponentComponent)
    // public baseComponentComponent: BaseComponentComponent,

    public override router: Router,
    public override route: ActivatedRoute,

    @Inject(PRODUCT_SERVICE) private productService: ProductService,
    @Inject(USE_BETTER) public isBetter: boolean,
    @Inject(API_URL) public apiUrl: string,
    @Inject(APP_CONFIG) public Config: AppConfig,
    @Inject('ProductServiceByUseFactory')
    private productServiceByUseFactory: any,
    @Inject('FuncByUseFactory') public funcByUseFactory: string,
    @Inject('funcByUseValue') public funcByUseValue: () => string,
    @Inject('funcByUseExist') public funcByUseExist: any
  ) {
    super(router, route);
    this.router.events
      .pipe(filter((x): x is NavigationEnd => x instanceof NavigationEnd))
      .subscribe((evnt: NavigationEnd) => {
        console.log('NavigationEnd ' + evnt.url);
      });

    this.apiUrlViaInjectorFunction = getUrl();
  }

  ngOnInit(): void {
    this.apiUrlViaConstructor = this.apiUrl;
    console.log('passedData', this.router.getCurrentNavigation()?.extras.state);
  }

  getProducts() {
    this.products = this.productService.getProducts();
  }

  getProductsByUseFactory() {
    this.products = this.productServiceByUseFactory.getProducts();
  }

  /*
  note:
  * "inject" provides "Easier inheritance" in addition to "Reusability" and "Type inference"
  * Example of "Easier inheritance" is below:
  */

  /*
   * OLD WAY
   */
  // export class ParentClass {
  //   constructor(
  //       private router: Router,
  //   ) {
  //       // ...
  //   }
  // }

  // @Component({
  //   // component metadata
  // })
  // export class ChildComponent extends ParentClass {
  //   constructor(
  //       // we have to inject all the
  //       // parent dependencies again
  //       // and add others
  //       private router: Router,
  //       private http: HttpClient,
  //   ) {
  //       super(router); // also pass to the parent
  //   }
  // }

  /*
   * NEW WAY
   */
  // export class ParentClass {
  //   private router = inject(Router);
  // }

  // @Component({
  //   // component metadata
  // })
  // export class ChildComponent extends ParentClass {
  //   private http = inject(HttpClient);
  // }
}
