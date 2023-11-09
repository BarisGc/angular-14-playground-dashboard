import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import 'reflect-metadata'; // it automatically adds a single variable to global scope called Reflect
@Component({
  selector: 'app-js-and-ts-practice-child2',
  templateUrl: './js-and-ts-practice-child2.component.html',
  styleUrls: ['./js-and-ts-practice-child2.component.scss'],
})
export class JsAndTsPracticeChild2Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.setPractices();
  }

  setPractices() {
    // this.practiceTsFundementals();
    // this.practiceTsClass();
    // this.practiceTsDecorators();
    this.practiceTsMetaDecorators();
  }

  practiceTsFundementals() {
    interface Todo {
      id: number;
      name: string;
      address: any;
    }
    const url = 'https://jsonplaceholder.typicode.com/users/1';

    axios.get(url).then((response: any) => {
      const user = response.data as Todo;

      const id = user.id;
      const name = user.name;
      const address = user.address;

      logUser(id, name, address);
    });

    const logUser = (id: number, name: string, address: any) => {
      console.log(
        `User ID: ${id}\nUser Name: ${name}\nUser Address: ${address}`
      );
    };

    let point: { x: number; y: number } = {
      x: 10,
      y: 20,
    };

    const logNumber: (i: number) => void = (i: number) => {
      console.log(i);
    };

    (function (n1: number, n2: number): number {
      return n1 / n2;
    })(2, 4);

    const today_s_Weather = {
      date: new Date(),
      weather: 'sunny',
      coords: {
        lat: 0,
        lng: 15,
      },
    };

    const {
      coords: { lat, lng },
    }: {
      coords: {
        lat: number;
        lng: number;
      };
    } = today_s_Weather;

    const carMakers = [['ford'], ['toyota'], ['chevy']];
    // string[][]
    const carMakers2 = [
      ['ford', [true, false]],
      ['toyota', [true, false]],
      [123, [false, true]],
    ];
    // ((string | boolean[])[] | (number | boolean[])[])[]

    // console.log("carmakers", carMakers2[1][1][1]);
    const carMakers3: [string | number, boolean[]][] = [
      ['ford', [true, false]],
      ['toyota', [true, false]],
      [123, [false, true]],
    ];

    console.log('carmakers', carMakers3[1][1][1]);
    // output: carmakers false
  }

  practiceTsClass() {
    practice1();
    practice2();

    function practice1() {
      class Vehicle {
        color: string;
        constructor(color: string) {
          this.color = color;
        }

        drive(): void {
          console.log('chugga chugga', this.color);
        }

        honk(): void {
          console.log('beep', this.color);
        }
      }

      class Car extends Vehicle {
        carSpecialHonst(): void {
          vehicle.honk();
        }
      }
      const vehicle = new Vehicle('orange');
      vehicle.drive();
      vehicle.honk();

      const car = new Car('red');
      car.honk();
    }

    function practice2() {
      class Vehicle {
        constructor(public color: string) {}

        protected honk(isElectric = false): void {
          console.log(`car color: ${this.color}`, 'beep', isElectric);
        }
      }

      class Car extends Vehicle {
        private drive(): void {
          console.log(`vroom with ${this.wheels} wheels}`);
        }

        constructor(public wheels: number, color: string) {
          super(color);
        }

        startDrivingProcess(): void {
          this.drive();
          this.honk();
        }
      }

      class VoltoElectric extends Car {
        constructor(public isElectric: boolean, wheels: number, color: string) {
          super(wheels, color);
        }
        override startDrivingProcess(): void {
          this.honk(this.isElectric);
        }
      }

      let volto = new Car(4, 'gray');
      // volto.startDrivingProcess();

      let voltoElectric = new VoltoElectric(true, 3, 'blue');
      voltoElectric.startDrivingProcess();
    }
  }

  practiceTsDecorators() {
    @classDecoratorExample
    class Boat {
      // property
      @propertyDecoratorExample
      color: string = 'red';

      // accessor
      @accessorDecoratorExample
      get formattedColor(): string {
        return `This boats color is ${this.color}`;
      }

      @logErrorDecorator
      @logErrorDecorator2('Oops boat was sunk in ocean')
      // method
      pilot(
        @parameterDecoratorExample speed: string,
        @parameterDecoratorExample generateWake: boolean
      ): void {
        throw new Error();
        console.log('swish');
      }
    }

    function logErrorDecorator(
      target: any, // Either the constructor function of the class for a static member, or the prototype of the class(Boat) for an instance member
      key: string, // key of the property/method/accessor on the object,
      descriptors: PropertyDescriptor // PropertyDescriptor is an object that has some configuration options around a property defined on an object
      // writable : Whether or not this property can be changed
      // enumerable : Whether or not this property gets looped over by a for..in loop
      // value : Current value
      // configurable : property definition can be changed and property can be deleted
    ): void {
      console.log('Target:', target);
      console.log('Key:', key);

      const car = { make: 'honda', year: 2000 };
      Object.getOwnPropertyDescriptor(car, 'make');
      console.log('descriptor', Object.getOwnPropertyDescriptor(car, 'make'));
      Object.defineProperty(car, 'make', { writable: false });
      console.log('descriptor', Object.getOwnPropertyDescriptor(car, 'make'));

      const method = descriptors.value;
      descriptors.value = function () {
        try {
          method();
        } catch (e) {
          console.log('Oops, boat was sunk in lake');
        }
      };
    }

    // decorator factory example
    function logErrorDecorator2(errorMessage: string) {
      return function (
        target: any,
        key: string,
        descriptors: PropertyDescriptor
      ) {
        const method = descriptors.value;
        descriptors.value = function () {
          try {
            method();
          } catch (e) {
            console.log(errorMessage);
          }
        };
      };
    }

    // caution: And remember that prototype inside a JavaScript generally only stores method definitions actual instance.
    // Properties such as strings, numbers, booleans arrays and so on all get defined inside the constructor.
    // so the property(color) is not available to us
    // so the only reason that we can use decorators on properties at all is more just for us to have the ability to know that "oh hey, like there's a color property and we know that because the key is going to be color" that's like pretty much it. this is the really only usage of a decorator around our properties inside of a class definition so we cant try to modify those properties or cant wrap some logic around them or anything like that.

    function propertyDecoratorExample(target: any, key: string) {
      console.log('propertyDecoratorExample');

      console.log('Target.color', target.color);
      console.log('Key:', key);
    }

    function accessorDecoratorExample(target: any, key: string) {
      console.log('accessorDecoratorExample');
      console.log('Target', target);
      console.log('Key:', key);
    }

    function parameterDecoratorExample(
      target: any,
      key: string,
      index: number
    ) {
      console.log('parameterDecoratorExample');
      console.log('Target', target);
      console.log('Key:', key);
      console.log('Index:', index);
    }

    function classDecoratorExample(constructor: typeof Boat) {
      console.log('classDecoratorExample constructor', constructor);
    }
    new Boat().pilot('fast', true);
  }

  practiceTsMetaDecorators() {
    const plane = {
      color: 'red',
    };

    Reflect.defineMetadata('note', 'hi there', plane);
    Reflect.defineMetadata('height', 10, plane);

    const note = Reflect.getMetadata('note', plane);

    console.log('note', note);
    console.log('height', Reflect.getMetadata('height', plane));

    Reflect.defineMetadata('note', 'hi there', plane, 'color');

    console.log('note', Reflect.getMetadata('note', plane, 'color'));
  }
}
