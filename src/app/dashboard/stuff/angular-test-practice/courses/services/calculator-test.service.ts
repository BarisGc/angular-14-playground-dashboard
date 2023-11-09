import { Injectable } from '@angular/core';
import { LoggerTestService } from './logger-test.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorTestService {
  constructor(private logger: LoggerTestService) {}

  add(n1: number, n2: number) {
    this.logger.log('Addition operation called');
    return n1 + n2;
  }

  subtract(n1: number, n2: number) {
    this.logger.log('Subtraction operation called');
    return n1 - n2;
  }
}
