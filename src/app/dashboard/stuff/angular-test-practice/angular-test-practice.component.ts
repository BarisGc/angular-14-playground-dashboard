import { Component, OnInit } from '@angular/core';
import { CalculatorTestService } from './courses/services/calculator-test.service';
import { ActivatedRoute, Router } from '@angular/router';

// ex: scope practice, not related test practice but i just practice here xD
// variables declared with var, let, or const are not automatically added as properties to the window object in Angular.
// In an Angular application, TypeScript is used instead of traditional JavaScript, and TypeScript is a strict superset of JavaScript that adds several new features and syntaxes to the language. TypeScript is designed to catch errors at compile time, rather than at runtime, which makes it easier to write and maintain large applications.
// Because of this, TypeScript does not add variables declared with var, let, or const to the global window object automatically. Instead, you need to explicitly add them as properties of the window object if you want to make them globally accessible.
// let aletvariable = 'let';
// var avarvariable = 'var';
// (window as any).myGlobalProperty = 'Hello, world!';
// console.log('aletvariable: ', aletvariable);
// console.log('avarvariable: ', avarvariable);
// console.log('window: ', window);
// console.log('window.myGlobalProperty: ', (window as any).myGlobalProperty);

// test practice
@Component({
  selector: 'app-angular-test-practice',
  templateUrl: './angular-test-practice.component.html',
  styleUrls: ['./angular-test-practice.component.scss'],
})
export class AngularTestPracticeComponent {
  constructor(
    private calculatorTestService: CalculatorTestService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.children.forEach(child => {
      console.log('Child Route: ', child.routeConfig?.path);
    })
    console.log('Route: ', this.route);
  }
}
