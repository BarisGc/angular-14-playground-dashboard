import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clean-code',
  templateUrl: './clean-code.component.html',
  styleUrls: ['./clean-code.component.scss'],
})
export class CleanCodeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.setPractices();
  }

  setPractices() {
    this.practiceReducingMethodParameters();
    this.practiceAvoidOutputParameters();
    this.practiceAvoidMixingHighAndLowLevelAbstractions();
    this.practiceAvoidDeepNesting();
  }

  practiceReducingMethodParameters() {
    let user = {
      id: 0,
      email: 'baris@gmail.com',
      password: 'Password10',
    };
    // note: In this example, the IIFE is given the name namedIIFE. However, note that naming an IIFE does not expose the function to the outer scope. The name is only accessible within the IIFE itself and cannot be referenced or called from outside.
    // Keep in mind that naming an IIFE doesn't change its behavior significantly. It still executes immediately and creates its own private scope. The main advantage of naming an IIFE is for better stack traces during debugging, where the named function can appear in the stack trace instead of a generic anonymous function.
    // (function saveUser({
    //   email,
    //   password,
    //   ...rest
    // }: {
    //   email: string;
    //   password: string;
    //   rest?: any;
    // }) {
    //   console.log('email', email);
    //   console.log('password', password);
    //   console.log('rest', rest);
    // })(user);
    (function saveUser(user: any, ...numbers: any) {
      const { password, email, ...rest } = user;
      console.log('user', user);
      console.log('numbers', numbers);
      console.log('email', email);
      console.log('password', password);
      console.log('rest', rest);
    })(user, 1, 2, 3, 4, 5);
  }

  practiceAvoidOutputParameters() {
    let x = 3;
    let y = 4;
    let resultSum = 0;
    let resultProduct = 0;

    function calculateSumAndProduct(
      a: number,
      b: number,
      resultSum: number,
      resultProduct: number
    ): any {
      resultSum = a + b;
      resultProduct = a * b;
      return { resultSum, resultProduct };
    }

    let result = calculateSumAndProduct(x, y, resultSum, resultProduct);

    console.log(result.resultSum); // Output: 7
    console.log(result.resultProduct); // Output: 12
  }

  practiceAvoidMixingHighAndLowLevelAbstractions() {
    // bad approach
    interface User1 {
      email: string;
      password: string;
    }

    class Database1 {
      static insert(user: User1) {
        console.log('user is inserted into db1', user);
      }
    }

    const user1 = { email: 'baris1@', password: 'password11' };
    createUser1(user1);

    function createUser1(user1: User1) {
      if (
        !user1.email ||
        !user1.email.includes('@') ||
        !user1.password ||
        user1.password.trim() === ''
      ) {
        console.log('Invalid Input!');
        return;
      }
      const newUser = {
        email: user1.email,
        password: user1.password,
      };
      Database1.insert(newUser);
    }

    // better approach
    interface User2 {
      email: string;
      password: string;
    }

    class Database2 {
      static insert(user: User2) {
        console.log('user is inserted into db2', user);
      }
    }

    const user2 = { email: 'baris2', password: 'password22' };
    handleCreateUserRequest(user2);

    function handleCreateUserRequest(user: any) {
      try {
        createUser2(user);
      } catch (error: any) {
        logErrorMessage(error.message);
      }
    }
    function createUser2(user: User2) {
      validate(user);

      saveUser(user);
    }

    function validate(user: User2) {
      if (!isInputValid(user)) {
        throw new Error('Invalid Input!');
      }
    }

    function isInputValid(user: User2) {
      const isValidated =
        emailIsValid(user.email) && isPasswordValid(user.password);

      return isValidated;
    }

    function emailIsValid(email: string) {
      return email?.includes('@');
    }

    function isPasswordValid(password: string) {
      return password?.trim() !== '';
    }

    function logErrorMessage(message: string) {
      console.log('Error Message:', ' ', message);
    }

    function saveUser(user: User2) {
      Database2.insert(user);
    }

    // alternative save way for better approach example (not preferred for now by me)
    class Database3 {
      static insert(user: User3) {
        console.log('user is inserted into db3', user);
      }
    }

    class User3 {
      email: string;
      password: string;
      constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
      }
      save() {
        Database3.insert(this);
      }
    }

    const newUser = new User3('baris3', 'password33');
    newUser.save();
  }

  practiceAvoidDeepNesting() {
    // practice preparing
    class CustomError extends Error {
      code: number;
      item: any;
      constructor(message: string, code: number = 402, item: any = null) {
        super(message);
        this.code = code;
        this.item = item;
        Object.setPrototypeOf(this, CustomError.prototype);
      }
    }

    const transactions = [
      {
        id: 't1',
        type: 'PAYMENT',
        status: 'OPEN',
        method: 'CREDIT_CARD',
        amount: '23.99',
      },
      {
        id: 't2',
        type: 'PAYMENT',
        status: 'OPEN',
        method: 'PAYPAL',
        amount: '100.43',
      },
      {
        id: 't3',
        type: 'REFUND',
        status: 'OPEN',
        method: 'CREDIT_CARD',
        amount: '10.99',
      },
      {
        id: 't4',
        type: 'PAYMENT',
        status: 'CLOSED',
        method: 'PLAN',
        amount: '15.99',
      },
    ];

    function processCreditCardPayment(transaction: any) {
      console.log(
        'Processing credit card payment for amount: ' + transaction.amount
      );
    }

    function processCreditCardRefund(transaction: any) {
      console.log(
        'Processing credit card refund for amount: ' + transaction.amount
      );
    }

    function processPayPalPayment(transaction: any) {
      console.log(
        'Processing PayPal payment for amount: ' + transaction.amount
      );
    }

    function processPayPalRefund(transaction: any) {
      console.log('Processing PayPal refund for amount: ' + transaction.amount);
    }

    function processPlanPayment(transaction: any) {
      console.log('Processing plan payment for amount: ' + transaction.amount);
    }

    function processPlanRefund(transaction: any) {
      console.log('Processing plan refund for amount: ' + transaction.amount);
    }

    // processTransactionsBadCode(transactions);
    processTransactionsCleanCode(transactions);

    // bad approach-1
    function processTransactionsBadCode(transactions: any) {
      console.log('processTransactionsBadCode');
      if (transactions && transactions.length > 0) {
        for (const transaction of transactions) {
          if (transaction.type === 'PAYMENT') {
            if (transaction.status === 'OPEN') {
              if (transaction.method === 'CREDIT_CARD') {
                processCreditCardPayment(transaction);
              } else if (transaction.method === 'PAYPAL') {
                processPayPalPayment(transaction);
              } else if (transaction.method === 'PLAN') {
                processPlanPayment(transaction);
              }
            } else {
              console.log('Invalid transaction type!');
            }
          } else if (transaction.type === 'REFUND') {
            if (transaction.status === 'OPEN') {
              if (transaction.method === 'CREDIT_CARD') {
                processCreditCardRefund(transaction);
              } else if (transaction.method === 'PAYPAL') {
                processPayPalRefund(transaction);
              } else if (transaction.method === 'PLAN') {
                processPlanRefund(transaction);
              }
            } else {
              console.log('Invalid transaction type!');
            }
          }
        }
      } else {
        console.log('No transactions provided!');
      }
    }

    // clean approach-1
    function processTransactionsCleanCode(transactions: any) {
      console.log('processTransactionsCleanCode');
      try {
        processTransactions(transactions);
      } catch (error) {
        logError(error);
      }

      function processTransactions(transactions: any) {
        // Guard, this is ok but it is better to transfer it into processTransaction function so i did it
        // if (!isOpen(transaction)) {
        //   console.log('transaction status is not open!');
        //   continue;
        // }
        validateTransactions(transactions);

        for (const transaction of transactions) {
          processTransaction(transaction);
        }
      }

      function validateTransactions(transactions: any) {
        if (isEmpty(transactions)) {
          const error = new CustomError('No transactions provided!');
          error.code = 1;
          throw error;
        }
      }

      function isEmpty(transactions: any) {
        return !transactions || transactions.length === 0;
      }

      function throwErrorMessage(
        message: string,
        code: number = 422,
        item: any = null
      ) {
        const error = new CustomError(message, code, item);
        throw error;
      }

      function logError(error: any) {
        console.log(error.message);
        console.log(error.code);
        console.log(error.item);
      }

      function processTransaction(transaction: any) {
        try {
          validateTransaction(transaction);
          processWithProcessor(transaction);
        } catch (error) {
          logError(error);
        }
      }

      function isOpen(transaction: any) {
        return transaction.status === 'OPEN';
      }

      function validateTransaction(transaction: any) {
        if (!isOpen(transaction)) {
          const error = new CustomError('Invalid transaction type.');
          error.item = transaction;
          throw error;
        }

        if (!isPayment(transaction) && !isRefund(transaction)) {
          const error = new CustomError('Invalid transaction type!');
          error.item = transaction;
          throw error;
        }
      }

      // factory functions "usage"
      function processWithProcessor(transaction: any) {
        const processors = getTransactionProcessors(transaction);

        if (!processors.processPayment || !processors.processRefund) {
          throwErrorMessage('No Transaction to Be Processed');
          return;
        }

        if (isPayment(transaction)) {
          processors.processPayment(transaction);
        } else {
          processors.processRefund(transaction);
        }
      }

      // factory functions "preparing"
      // where we built a factory function,which created polymorphic objects to hold different functions for handling payments and refunds.
      function getTransactionProcessors(transaction: any) {
        interface Processors {
          processPayment: ((transaction: any) => void) | null;
          processRefund: ((transaction: any) => void) | null;
        }

        enum TransactionMethod {
          CREDIT_CARD = 'CREDIT_CARD',
          PAYPAL = 'PAYPAL',
        }
        const TYPE_PLAN = 'PLAN';

        let processors: Processors = {
          processPayment: null,
          processRefund: null,
        };
        if (usesTransactionMethod(transaction, TransactionMethod.CREDIT_CARD)) {
          processors.processPayment = processCreditCardPayment;
          processors.processRefund = processCreditCardRefund;
        } else if (
          usesTransactionMethod(transaction, TransactionMethod.PAYPAL)
        ) {
          processors.processPayment = processPayPalPayment;
          processors.processRefund = processPayPalRefund;
        } else if (usesTransactionMethod(transaction, TYPE_PLAN)) {
          processors.processPayment = processPlanPayment;
          processors.processRefund = processPlanRefund;
        }
        return processors;
      }

      function usesTransactionMethod(transaction: any, method: any) {
        return transaction.method === method;
      }

      function isPayment(transaction: any) {
        return transaction.type === 'PAYMENT';
      }

      function isRefund(transaction: any) {
        return transaction.type === 'REFUND';
      }
    }
  }

  practicePolymorphismInClasses() {
    // bad approach
    function badApproach() {
      type Purchase = any;

      let Logistics: any;

      class Delivery {
        private purchase: Purchase;

        constructor(purchase: Purchase) {
          this.purchase = purchase;
        }

        deliverProduct() {
          if (this.purchase.deliveryType === 'express') {
            Logistics.issueExpressDelivery(this.purchase.product);
          } else if (this.purchase.deliveryType === 'insured') {
            Logistics.issueInsuredDelivery(this.purchase.product);
          } else {
            Logistics.issueStandardDelivery(this.purchase.product);
          }
        }

        trackProduct() {
          if (this.purchase.deliveryType === 'express') {
            Logistics.trackExpressDelivery(this.purchase.product);
          } else if (this.purchase.deliveryType === 'insured') {
            Logistics.trackInsuredDelivery(this.purchase.product);
          } else {
            Logistics.trackStandardDelivery(this.purchase.product);
          }
        }
      }
    }

    // good approach
    goodApproachUsingPolymorphismAndCompositionInClasses();
    function goodApproachUsingPolymorphismAndCompositionInClasses() {
      type Purchase = any;

      let Logistics: any;

      interface Delivery {
        deliverProduct(): void;
        trackProduct(): void;
      }

      class DeliveryImplementation {
        protected purchase: Purchase;

        constructor(purchase: Purchase) {
          this.purchase = purchase;
        }
      }

      // The classes ExpressDelivery, InsuredDelivery, and StandardDelivery all implement the Delivery interface, which defines the methods deliverProduct() and trackProduct(). By implementing this common interface, these classes exhibit polymorphic behavior. The delivery object, regardless of its specific class type, can be used uniformly to invoke the deliverProduct() method.
      class ExpressDelivery extends DeliveryImplementation implements Delivery {
        deliverProduct() {
          Logistics.issueExpressDelivery(this.purchase.product);
        }

        trackProduct() {
          Logistics.trackExpressDelivery(this.purchase.product);
        }
      }

      class InsuredDelivery extends DeliveryImplementation implements Delivery {
        deliverProduct() {
          Logistics.issueInsuredDelivery(this.purchase.product);
        }

        trackProduct() {
          Logistics.trackInsuredDelivery(this.purchase.product);
        }
      }

      class StandardDelivery
        extends DeliveryImplementation
        implements Delivery
      {
        deliverProduct() {
          Logistics.issueStandardDelivery(this.purchase.product);
        }

        trackProduct() {
          Logistics.trackStandardDelivery(this.purchase.product);
        }
      }

      // composition
      // The function createDelivery() is an example of composition. It creates instances of different delivery classes (ExpressDelivery, InsuredDelivery, or StandardDelivery) based on the purchase.deliveryType value.
      function createDelivery(purchase: any) {
        if (purchase.deliveryType === 'express') {
          delivery = new ExpressDelivery(purchase);
        } else if (purchase.deliveryType === 'insured') {
          delivery = new InsuredDelivery(purchase);
        } else {
          delivery = new StandardDelivery(purchase);
        }
        return delivery;
      }

      let delivery: Delivery = createDelivery({}); // send purchase object via api as parameter

      delivery.deliverProduct();
    }
  }

  practiceLawOfDemeter() {
    class Customer {
      lastPurchase: any;

      getLastPurchaseDate() {
        return this.lastPurchase.date;
      }
    }

    class DeliveryJob {
      customer: any;
      warehouse: any;

      constructor(customer: any, warehouse: any) {
        this.customer = customer;
        this.warehouse = warehouse;
      }

      // tell, don't ask
      deliverLastPurchase() {
        // const date = this.customer.lastPurchase.date;
        // const date = this.customer.getLastPurchaseDate();
        // this.warehouse.deliverPurchasesByDate(this.customer, date);
        // tell, don't ask so no need to use codes above
        this.warehouse.deliverPurchase(this.customer.lastPurchase);
      }
    }
  }

  practiceSolidPrinciples() {
    function singleResponsibilityPrinciple_Aka_SRP() {
      // NOT violating SRP
      class User {
        login(email: string, password: string) {}

        signup(email: string, password: string) {}

        assignRole(role: any) {}
      }

      // Violating SRP
      class ReportDocument {
        generateReport(data: any) {}

        createPDF(report: any) {}
      }
    }

    function open_closedPrinciple_Aka_OCP() {
      // class Printer {
      //   printPDF(data: any) {
      //     // ...
      //   }

      //   printWebDocument(data: any) {
      //     // ...
      //   }

      //   printPage(data: any) {
      //     // ...
      //   }

      //   verifyData(data: any) {
      //     // ...
      //   }
      // }

      interface Printer {
        print(data: any): void;
      }

      class PrinterImplementation {
        verifyData(data: any) {}
      }

      class WebPrinter extends PrinterImplementation implements Printer {
        print(data: any) {
          // print web document
        }
      }

      class PDFPrinter extends PrinterImplementation implements Printer {
        print(data: any) {
          // print PDF document
        }
      }

      class PagePrinter extends PrinterImplementation implements Printer {
        print(data: any) {
          // print real page
        }
      }
    }

    function liskosSubstitutionPrinciple_Aka_LSP() {
      class Bird {}
      class FlyingBird extends Bird {
        fly() {
          console.log('Fyling...');
        }
      }

      class Eagle extends FlyingBird {
        dive() {
          console.log('Diving...');
        }
      }

      const eagle = new Eagle();
      eagle.fly();
      eagle.dive();

      class Penguin extends Bird {
        // Problem: Can't fly!
      }
    }

    function interfaceSegregationPrinciple_Aka_ISP() {
      interface Database {
        storeData(data: any): void;
      }

      interface RemoteDatabase {
        connect(uri: string): void;
      }

      class SQLDatabase implements Database, RemoteDatabase {
        connect(uri: string) {
          // connecting...
        }

        storeData(data: any) {
          // Storing data...
        }
      }

      class InMemoryDatabase implements Database {
        storeData(data: any) {
          // Storing data...
        }
      }
    }

    function dependencyInversionPrinciple_Aka_DIP() {
      interface Database {
        storeData(data: any): void;
      }

      interface RemoteDatabase {
        connect(uri: string): void;
      }

      class SQLDatabase implements Database, RemoteDatabase {
        connect(uri: string) {
          console.log('Connecting to SQL database!');
        }

        storeData(data: any) {
          console.log('Storing data...');
        }
      }

      class InMemoryDatabase implements Database {
        storeData(data: any) {
          console.log('Storing data...');
        }
      }

      class App {
        private database: Database;

        constructor(database: Database) {
          this.database = database;
        }

        saveSettings() {
          this.database.storeData('Some data');
        }
      }

      const sqlDatabase = new SQLDatabase();
      sqlDatabase.connect('my-url');
      const app = new App(sqlDatabase);
    }
  }
}
