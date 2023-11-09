import { CalculatorTestService } from './calculator-test.service';
import { LoggerTestService } from './logger-test.service';
import { TestBed } from '@angular/core/testing';

// note:
// 1) So first, we have sort of a set up phase where we are preparing the components or services that we
// want to test.
// 2) Then we have sort of an execution phase where we are going to Draeger the operation that we want to
// test.
// 3) And atleast at the end of the test, we are going to write a series of test assertions that are either
// going to fail, marking the test as failed or they are going to be successful, which means that the
// test is going to be marked this successful.
describe('CalculatorTestService', () => {
  let calculatorTestService: CalculatorTestService, loggerSpy: any;

  beforeEach(() => {
    console.log('Calling beforeEach');

    // As we can see below, the Jasmyn spying functionality allows us to do several very important things in our
    // tests:
    // 1) We can keep track of the number of times that the function is called.
    // 2) We can provide a fake implementation of a function and define what values it should return.
    // 3) We can either spy on an existing object or we can create a complete mock implementation of our dependency.
    loggerSpy = jasmine.createSpyObj('LoggerTestService', ['log']);
    // caution: the following line is not right way to do it since it creates a new instance of LoggerTestService, may be expensive, instead we should mock it like above
    // const calculatorTestService = new CalculatorTestService(new LoggerTestService());
    TestBed.configureTestingModule({
      providers: [
        CalculatorTestService,
        { provide: LoggerTestService, useValue: loggerSpy },
      ],
    });

    calculatorTestService = TestBed.get(CalculatorTestService);
  });

  it('should add two numbers', () => {
    console.log('add test');

    const result = calculatorTestService.add(2, 2);

    expect(result).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    console.log('subtract test');

    const result = calculatorTestService.subtract(2, 2);

    expect(result).toBe(0, 'unexpected subtraction result');

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});

// note:
// As we can see before each has been called before the ad tests the first time, and then it was called

// a second time just before the subtract test.

// So this means that these variables here and have been continuously overwritten before each of the tests.

// This also means that the tests are independent from each other.

// So the calculated instance that is being used here on the.

// Subtract test is different than the calculator instance that is being used on the admission test, this

// is to make sure that the tests do not interfere with each other.

// And it's also meant to ensure that the tests can be executed in any order.

// Whenever you find yourself in a situation where the order of the tests matters and changing the order

// of the tests causes the tests to either fail or complete as you switch the order of the tests.

// That is an indication that the tests are not, well, isolated and that some of the set up of one test

// is typically interfering with another test and intentionally so.

// That is a good time to check here your before each block to make sure that all the test dependencies

// are getting initialized correctly before each test.

// Let's now keep building upon this version of our calculator service test.

// We are going to introduce the notion of angular dependency injection and its use in unit testing.
