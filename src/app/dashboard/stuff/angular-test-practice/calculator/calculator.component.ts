import { Component, OnInit } from '@angular/core';
import { CalculatorTestService } from '../courses/services/calculator-test.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  windowRef = window;
  numberInputs = {
    numberInput1: 0,
    numberInput2: 0,
  };

  result = 0;
  constructor(private calculatorTestService: CalculatorTestService) {}

  ngOnInit(): void {}

  byAdd(num1: number, num2: number) {
    this.result = this.calculatorTestService.add(num1, num2);
  }

  bySubtract(num1: number, num2: number) {
    this.result = this.calculatorTestService.subtract(num1, num2);
  }
}
