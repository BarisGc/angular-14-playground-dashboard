import { Injectable } from '@angular/core';
import { Product } from './product';
import { LoggerService } from './logger.service';

@Injectable()
export class BetterProductService {
  constructor(private loggerService: LoggerService) {
    this.loggerService.log('loggerservice getProducts called');
  }

  getProducts() {
    let products: Product[];

    products = [
      new Product(1, 'Memory Card', 500),
      new Product(2, 'Pen Drive', 750),
      new Product(3, 'Power Bank', 100),
      new Product(4, 'Laptop', 10000),
      new Product(5, 'Desktop', 100),
    ];

    return products;
  }
}
