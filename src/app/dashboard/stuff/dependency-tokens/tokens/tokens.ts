import { InjectionToken } from '@angular/core';
import { ProductService } from '../service/product.service';

// note: The string arguments 'apiUrl', 'isBetter' etc. are just a labels to identify these injection tokens; you can use any meaningful string for that purpose.
export const API_URL = new InjectionToken<string>('apiUrl');
export const USE_BETTER = new InjectionToken<boolean>('isBetter');
export const PRODUCT_SERVICE = new InjectionToken<ProductService>(
  'productService'
);
export const APP_CONFIG = new InjectionToken<any>('appConfiguration');
