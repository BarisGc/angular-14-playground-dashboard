import { Injectable } from '@angular/core';
import { Product } from './product';
import { LoggerService } from './logger.service';

@Injectable()
export class ProductService {
  getProducts() {
    let products: Product[];

    products = [
      new Product(1, 'Memory Card', 500),
      new Product(2, 'Pen Drive', 750),
      new Product(3, 'Power Bank', 100),
    ];

    return products;
  }
}
