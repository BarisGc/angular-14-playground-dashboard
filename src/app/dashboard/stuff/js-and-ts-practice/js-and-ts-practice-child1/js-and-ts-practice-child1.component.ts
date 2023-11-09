import { Component, Input, OnInit } from '@angular/core';
import { timer, interval, take } from 'rxjs';

/**
 *
 *
 * @export
 * @class Js Practice
 * @implements {OnInit}
 */
@Component({
  selector: 'app-js-and-ts-practice-child1',
  templateUrl: './js-and-ts-practice-child1.component.html',
  styleUrls: ['./js-and-ts-practice-child1.component.scss'],
})
export class JsAndTsPracticeChild1Component implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.setPractices();
  }

  setPractices() {
    this.practiceAnonymousFunction();
    this.compareTimerVsIntervalRxjs();
    this.practiceFirstClassFunctions();
    this.practiceHoisting();
    this.practices();
  }
  // note: timer vs interval Rxjs practice
  compareTimerVsIntervalRxjs() {
    timer(0, 1000)
      .pipe(take(2))
      .subscribe((n) => console.log('timer', n));
    interval(1000)
      .pipe(take(2))
      .subscribe((n) => console.log('interval', n));
  }
  // note: anonymous function practice
  practiceAnonymousFunction() {
    (function (parameters: string[]) {
      console.log('anonymous func parameters', parameters);
    })(['argument1', 'argument2']);
    // alternative invoke
    // }(['argument1', 'argument2']));
  }
  // Note: first class functions practice
  practiceFirstClassFunctions() {
    // ↓ Assigning a function to a variable ↓
    const myFunction = function () {
      console.log('Hello, Assigning a function to a variable');
    };
    myFunction();

    // ↓ Passing a function as an argument to another function ↓
    function runFunction(func: Function) {
      func();
    }

    runFunction(function () {
      console.log(
        'Hello, Passing a function as an argument to another function'
      );
    });

    // ↓ Returning a function from another function ↓
    function createMultiplier(factor: number) {
      return function (number: number) {
        return number * factor;
      };
    }

    const double = createMultiplier(2);
    console.log('Returning a function from another function', double(5)); // 10
  }
  // hoisting practice
  practiceHoisting() {
    b(); // called b !

    // console.log('a', a);

    // js: undefined because execution context has 2 phases

    // second phase: it(execution phase) runs your code line by line, interpreting it, converting it, compiling it,
    // executing it on the computer into something the computer can understand.

    // first phase: creation phase >>>> set memory space for variables and functions means hoisting
    // All this means is that before your code begins to be executed line by line,
    // the JavaScript engine has already set aside memory space for
    // the variables that you've created in that entire code that you've built,
    // and all of the functions that you've created as well.
    // So those functions and those variables exist in memory.
    // So when the code begins to execute line by line, it can access them.
    // However, when it comes to variables, it's a little bit different.
    // You see the function in its entirety is placed into memory space, meaning
    // that the function, its name and the code inside the function is being executed.
    // However the next phase, the execution phase which
    // we'll talk about in a moment where it actually executes your code line by line,
    // that's when these kind of assignments are set, where a equals something.
    // So the JavaScript engine when it sets up the memory space for a, it doesn't
    // know what its value will ultimately end up being until it starts executing its code.
    // So instead, it puts a placeholder called undefined.
    // That placeholder means oh, I don't know what this value is yet.
    // It's the same placeholder that we would have, if we never said it at all.
    // ⁡⁣⁢⁣𝘈𝘭𝘭 𝘷𝘢𝘳𝘪𝘢𝘣𝘭𝘦𝘴 𝘪𝘯 𝘑𝘢𝘷𝘢𝘚𝘤𝘳𝘪𝘱𝘵 𝘢𝘳𝘦 𝘪𝘯𝘪𝘵𝘪𝘢𝘭𝘭𝘺 𝘴𝘦𝘵 𝘵𝘰 un𝘥𝘦𝘧𝘪𝘯𝘦𝘥 𝘢𝘯𝘥 𝘧𝘶𝘯𝘤𝘵𝘪𝘰𝘯𝘴 𝘢𝘳𝘦 𝘴𝘪𝘵𝘵𝘪𝘯𝘨 𝘪𝘯 𝘮𝘦𝘮𝘰𝘳𝘺 𝘪𝘯 𝘵𝘩𝘦𝘪𝘳 𝘦𝘯𝘵𝘪𝘳𝘦l𝘺.⁡
    // That's why it's actually a bad idea to rely on hoisting in any way.
    // You could run into trouble when you realize that
    // value is actually undefined, and not the value you're expecting.
    // So while this technically kind of works, it's better to always do this, so that you don't get caught up in that trap.⁡

    // ts: error: Variable 'a' is used before being assigned

    var a = 'hello hoisting';

    console.log('a', a);

    function b() {
      console.log('called b !');
    }

    var c = undefined;
    if (c === undefined) {
      console.log('c is undefined');
      // returns true so "c is undefined"
    }

    // check lexical environment for scope chain
    function d() {
      // all myVar variables are unique, seperate memory
      // var myVar=2
      console.log(myVar);
    }
    function e() {
      d();
    }
    var myVar = 1;
    e();
  }

  // practices
  practices() {
    // operator precedence and associativity
    function example1Associavity() {
      var a = 2,
        b = 3,
        c = 4;
      a = b = c;
      // because associavity of assigments is right-to-left, all of them are 4
      // b = c so b = 4
      // a = b so a = 4
      console.log('a', a); // result: 4
      console.log('b', b); // result: 4
      console.log('c', c); // result: 4
    }

    const example2Coersion = function () {
      var a = 1,
        b = '2';
      console.log('a+b', a + b); // due to coersion result: 12

      // sidenote1: Number(undefined) equals "NaN"
      // caution1: null coerces to zero when less than or greater than like null < 1
      // does not cources to zero when comparison like null == 0, this results as a "false"
      // sidenote2: ===(strict equality check) does not coerces the values, this is work of way
    };

    const example3Comparison = function () {
      // note: ts prevents this usage but can be used in js
      // Operator '<' cannot be applied to types 'boolean' and 'number'
      // console.log("3<2<1 is true?", Boolean(3<2<1)) result: true since 3<2 equals false and false equals zero and zero less than 1
    };

    const example4IsNan = function () {
      // isNaN(NaN); // true, this is the supposed result, the argument is NaN
      // isNaN('hello'); // true, but this is misleading, cuz `hello` is not NaN
      // Number.isNaN('hello') // false, 'hello' is not NaN, this is the supposed result
      console.log("Number.isNaN('hello')", Number.isNaN('hello'));
    };

    const example5TruthFalsy = function () {
      var a;
      a = 0;
      // note1: strict equals precedence is greater than || so the if statements is true
      // note2:
      // a) When || is used in an if statement, it evaluates the expression on the left-hand side of the operator first. If the left-hand side expression is falsy, then the expression on the right-hand side of the operator will be evaluated
      // b) When || is used in a return statement, it returns the value of the first truthy expression encountered, or the value of the last expression if all expressions are falsy
      if (a || a === 0) console.log('something is there');
    };

    const example6FakingNamespaces = function () {
      var greet = 'Hello!';
      var greet = 'Hola!';
      console.log('greet', greet);

      var english = {
        greetings: {
          greet: '',
        },
      };

      var spanish = {
        greetings: {
          greet: '',
        },
      };

      // can not create a new key using . notation in ts unless you define the type but in js you can create
      // var english: any; you can use as this cuz it prevents type check :)
      english.greetings.greet = 'hello';

      // you can not create "greetings" on the fly!
      // english.greetings.greet = "Hello!"
    };

    const example7JsFunctionsAreObjects = function () {
      // it contains code(to be invoked), name and other properties
      function greet() {
        console.log('greet');
      }

      console.log('greet', greet);
      // result:
      // function greet() {
      //   console.log("greet")
      // }
      greet.language = 'english';
      console.log('greet.language', greet.language);
      // result:
      // english

      function a(arg0: string) {
        console.log('a', arg0);
        // return arg0;  // you have to return value if you want to log in chrome console
      }

      a(
        (function testfunc() {
          return 'bu bir fonksiyon returnudür';
        })()
      );
    };

    // this keyword practices
    let thisRef = this;
    const example8This = function (thisRef: any) {
      // practice1
      thisRef.newvariable = 'hello';
      console.log('thisRef', thisRef);
      // practice2
      // caution: this inside internal/nested function refers to global object! so go for the approach below!
      var c = {
        name: 'the c object',
        log: function () {
          var self = this;
          self.name = 'updated c object';
          console.log('self', self);

          var setname = function (newname: string) {
            self.name = newname;
          };
          setname('updated again! the c object');
          console.log('self', self);
        },
      };
    };

    const example9ComplexArray = function () {
      var arr = [
        1,
        false,
        {
          name: 'Tony',
          address: '111 Main St.',
        },
        function (name: string) {
          var greeting = 'Hello ';
          console.log(greeting + name);
        },
        'hello',
      ];

      console.log('arr', arr);
      // arr[3](arr[2].name); // result in js: Hello Tony && result in ts: "This expression is not callable."
    };

    const example10FunctionOverloading = function () {
      function greet(firstname: string, lastname: string, language: string) {
        language = language || 'en';
        if (language === 'en') {
          console.log('Hello ' + firstname + ' ' + lastname);
        }
        if (language === 'es') {
          console.log('Hola ' + firstname + ' ' + lastname);
        }
      }
      greet('John', 'Doe', 'en');
      greet('John', 'Doe', 'es');
    };

    const example11AutomaticSemicolonInsertion = function () {
      function getPerson() {
        // return
        // {
        //   firstname: 'Tony',
        // };
      }

      console.log(getPerson()); // result: undefined if js whereas ts gives error
    };

    const example12FunctionStatementAndFunctionExpression = function () {
      // function statement
      function greet1(name: string) {
        console.log('Hello ' + name);
      }
      greet1('John');

      // function expression
      var greet2 = function (name: string) {
        console.log('Hello ' + name);
      };
      greet2('John');

      // note: function expressions are not hoisted
      // note: function expressions are anonymous
      // note: function expressions are first-class
    };

    const example13_Var_let_Const_differences = function () {
      // ex1:
      // The difference between let/const and var is in the scope of the variables they create:
      // Variables declared by let/const are only available inside the block where they’re defined.
      // Variables declared by var are available throughout the function in which they’re declared.
      // Consider the difference between these two JavaScript functions:
      function varScoping() {
        var x = 1;
        if (true) {
          var x = 2;
          console.log(x); // will print 2
        }
        console.log(x); // will print 2
      }
      function letScoping() {
        let x = 1;

        if (true) {
          let x = 2;
          console.log(x); // will print 2
        }
        console.log(x); // will print 1
      }
      varScoping();
      letScoping();

      // ex2:
      // A var variable will be available thoroughout the function body in which it is defined, no matter how deeply nested its definition. A let variable will only be available within the same block where it is defined. See below:
      (function nestedScopeTest() {
        if (true) {
          var functionVariable = 1;
          let blockVariable = 2;

          console.log(functionVariable); // will print 1
          console.log(blockVariable); // will print 2

          if (true) {
            console.log(functionVariable); // will print 1
            console.log(blockVariable); // will print 2
          }
        }

        console.log(functionVariable); // will print 1
        // console.log(blockVariable); // will throw an error in js runtime, Cannot find name 'blockVariable'.ts(2304) in ts compile time
      })();

      // note: hoisting vs scope
      // Hoisting is related to variable declaration and initialization in JavaScript, but it is not directly related to the scoping differences between var and let variables.

      // In JavaScript, variable declarations using the var keyword are hoisted to the top of their scope, which means that the variable is moved to the top of its enclosing function or global scope before the code is executed. This means that you can use a var variable before it has been declared, and it will be initialized with a value of undefined.

      // On the other hand, variable declarations using the let and const keywords are not hoisted in the same way as var variables. They are still hoisted, but they are not initialized until the point in the code where they are declared, which is known as the temporal dead zone (TDZ). This means that if you try to use a let or const variable before it has been declared, you will get a ReferenceError.

      // So, while hoisting does affect how variables are declared and initialized in JavaScript, it is not the reason for the scoping differences between var and let variables. These differences are due to the fact that var variables use function-level scoping, while let variables use block-level scoping

      // ex3:
      // One final point to note is that when working outside of function bodies, at a global level, let does not create a property on the global object, whereas var does. Therefore:
      // Global variables
      var x = 1;
      let y = 2;
      // console.log(this.x); // will print 1 at global level in js
      // console.log(this.y); // will print undefined at global level in js

      // Scoping rules
      // The main difference is scoping rules. Variables declared by var keyword are scoped to the immediate function body (hence the function scope) while let variables are scoped to the immediate enclosing block denoted by { } (hence the block scope).

      // ex1:
      // function run() {
      //   var foo = "Foo";
      //   let bar = "Bar";

      //   console.log(foo, bar); // Foo Bar

      //   {
      //     var moo = "Mooo"
      //     let baz = "Bazz";
      //     console.log(moo, baz); // Mooo Bazz
      //   }

      //   console.log(moo); // Mooo
      //   console.log(baz); // ReferenceError
      // }

      // run();

      // ex2:
      // The reason why let keyword was introduced to the language was function scope is confusing and was one of the main sources of bugs in JavaScript.

      // Take a look at this example from another Stack Overflow question:

      // var funcs = [];
      // // let's create 3 functions
      // for (var i = 0; i < 3; i++) {
      //   // and store them in funcs
      //   funcs[i] = function() {
      //     // each should log its value.
      //     console.log("My value: " + i);
      //   };
      // }
      // for (var j = 0; j < 3; j++) {
      //   // and now let's run each one to see
      //   funcs[j]();
      // }

      // My value: 3 was output to console each time funcs[j](); was invoked since anonymous functions were bound to the same variable.

      // People had to create immediately invoked functions to capture correct values from the loops but that was also hairy.

      // ex3
      // Hoisting
      // While variables declared with var keyword are hoisted (initialized with undefined before the code is run) which means they are accessible in their enclosing scope even before they are declared:

      // function run() {
      //   console.log(foo); // undefined
      //   var foo = "Foo";
      //   console.log(foo); // Foo
      // }

      // run();

      // let variables are not initialized until their definition is evaluated. Accessing them before the initialization results in a ReferenceError. The variable is said to be in "temporal dead zone" from the start of the block until the initialization is processed.

      // function checkHoisting() {
      //   console.log(foo); // ReferenceError
      //   let foo = "Foo";
      //   console.log(foo); // Foo
      // }

      // checkHoisting();

      // ex4
      // Creating global object property
      // At the top level, let, unlike var, does not create a property on the global object:

      // var foo = "Foo";  // globally scoped
      // let bar = "Bar"; // not allowed to be globally scoped

      // console.log(window.foo); // Foo
      // console.log(window.bar); // undefined

      // ex5
      // Redeclaration
      // In strict mode, var will let you re-declare the same variable in the same scope while let raises a SyntaxError.

      // 'use strict';
      // var foo = "foo1";
      // var foo = "foo2"; // No problem, 'foo1' is replaced with 'foo2'.

      // let bar = "bar1";
      // let bar = "bar2"; // SyntaxError: Identifier 'bar' has already been declared

      // ex6
      // let can also be used to avoid problems with closures. It binds fresh value rather than keeping an old reference as shown in examples below.
      // for(var i=1; i<6; i++) {
      //   $("#div" + i).click(function () { console.log(i); });
      // }
      // Code above demonstrates a classic JavaScript closure problem. Reference to the i variable is being stored in the click handler closure, rather than the actual value of i.

      // Every single click handler will refer to the same object because there’s only one counter object which holds 6 so you get six on each click.

      // A general workaround is to wrap this in an anonymous function and pass i as an argument.
      // Such issues can also be avoided now by using let instead var
    };

    const example14_bind_call_apply = function () {
      // call attaches this into function and executes the function immediately:
      var person = {
        name: 'James Smith',
        hello: function (thing: any) {
          console.log(this.name + ' says hello ' + thing);
        },
      };

      person.hello('world'); // output: "James Smith says hello world"
      person.hello.call({ name: 'Jim Smith' }, 'world'); // output: "Jim Smith says hello world"

      // bind attaches this into function and it needs to be invoked separately like this:
      var person = {
        name: 'James Smith',
        hello: function (thing: any) {
          console.log(this.name + ' says hello ' + thing);
        },
      };

      person.hello('world'); // output: "James Smith says hello world"

      // like this
      var helloFunc = person.hello.bind({ name: 'Jim Smith' });
      helloFunc('world'); // output: Jim Smith says hello world"

      // or like this:
      var helloFunc2 = person.hello.bind({ name: 'Jim Smith' }, 'world');
      helloFunc2(); // output: Jim Smith says hello world"

      // apply is similar to call except that it takes an array-like object instead of listing the arguments out one at a time:
      function personContainer(...arg: string[]) {
        var person = {
          name: 'James Smith',
          hello: function () {
            console.log(this.name + ' says hello ' + arguments[1]);
          },
        };
        person.hello.apply(person, arg as []);
      }
      personContainer('world', 'mars'); // output: "James Smith says hello mars", note: arguments[0] = "world" , arguments[1] = "mars"
    };

    const example15Prototypes = function () {
      var person = {
        firstname: 'Default',
        lastname: 'Default',
        getFullName: function () {
          return this.firstname + ' ' + this.lastname;
        },
      };
      var john = {
        firstname: 'John',
      };

      // don't do this EVER! for demo purposes only!!! low performance!!!
      let johnProto = Object.getPrototypeOf(john);
      johnProto = person;
      console.log(johnProto.getFullName()); // John Default
      console.log(johnProto.firstname); // John

      var jane = {
        firstname: 'Jane',
      };
      // caution: the __proto__ property is not a standard part of the JavaScript language specification, and it is not supported by TypeScript.
      // jane.__proto__ = person;
      // console.log(jane.getFullName()); // Jane Default
    };

    const example16Symbols = function () {
      let sym1 = Symbol();
      let sym2 = Symbol('thisisdescriptionforsymbol'); // optional string key for description for symbol
      let sym3 = Symbol('thisisdescriptionforsymbol');
      sym2 === sym3; // false, symbols are unique

      const sym4: unique symbol = Symbol('thisisdescriptionforsymbol');
      const sym5: unique symbol = Symbol('thisisdescriptionforsymbol'); // unique symbol

      // sym4 === sym5 This comparison appears to be unintentional because the types 'typeof sym4' and 'typeof sym5' have no overlap.ts(2367)

      let obj = {
        [sym1]: 'value1',
        [sym2]: 'value2',
      };
      console.log('symbol', obj[sym1], obj[sym2]); // "value"
    };

    const example17MapVsSet = function () {
      // #map

      let map = [
        [true, 1],
        ['two', 2],
        ['three', 3],
        ['four', 4],
      ];
      //  you cant;
      // const map1 = new Map(map);
      //  due to typescript, you need to set 1 by 1, but you can do this in javascript
      const map1 = new Map<string | boolean, number>();
      map1.set(true, 1);
      map1.set('two', 2);
      map1.set('three', 3);
      map1.set('four', 4);
      map1.set(true, 5);

      console.log('map1', map1);

      const keyValuePairs = new Map();
      const studentDetails = [
        { id: 1, name: 'Joseph', age: 15 },
        { id: 2, name: 'Milli', age: 13 },
        { id: 3, name: 'John', age: 11 },
        { id: 4, name: 'Mike', age: 16 },
        { id: 5, name: 'John', age: 18 },
      ];
      [
        ...new Set(
          studentDetails.map((obj) => {
            return obj.name;
          })
        ),
      ].forEach((entry) => {
        keyValuePairs.set(`name${keyValuePairs.size}`, entry);
      });
      console.log('keyValuePairs', keyValuePairs);
      const iterator1 = keyValuePairs.entries();
      let text1 = '';
      for (const entry of iterator1) {
        text1 += entry + ' ';
      }
      console.log('text1: ', text1);

      // #set #unique values #uniquevalues
      let arr1 = [1, 2, 3, 4];

      const set1 = new Set(arr1);
      console.log('set1', set1);



      console.log(
        'studentDetails',
        new Set(studentDetails.map((obj) => obj.name))
      );

      console.log('studentDetails', [
        ...new Set(studentDetails.map((obj) => obj.name)),
      ]);
      console.log(
        'studentDetails',
        Array.from(new Set(studentDetails.map((obj) => obj.name)))
      );



      const keyValuePairs2 = new Set(
        studentDetails.map((obj) => {
          return obj.name;
        })
      );

      console.log('keyValuePairs2', keyValuePairs2);
      // List all entries
      const iterator2 = keyValuePairs2.entries();
      let text2 = '';
      for (const entry of iterator2) {
        text2 += entry + ' ';
      }
      console.log('text2: ', text2);
    };

    // example1Associavity();
    // example2Coersion();
    // example3Comparison();
    // example4IsNan();
    // example5TruthFalsy();
    // example6FakingNamespaces();
    // example7JsFunctionsAreObjects();
    // example8This(thisRef);
    // example9ComplexArray();
    // example10FunctionOverloading();
    // example11AutomaticSemicolonInsertion();
    // example12FunctionStatementAndFunctionExpression();
    // example13_Var_let_Const_differences();
    // example14_bind_call_apply();
    // example15Prototypes();
    example16Symbols();
    example17MapVsSet();
  }
}
// console.log("testthis",this) result: loglamıyor, sanırım angular class yapısı dışında olduğu için, saf js veya ts ortamında olsa loglayabilirdi belki.
