import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CoursesCardListComponent } from './courses-card-list.component';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { setupCourses } from '../common/setup-test-data';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

// keywords: #testing #jasmin
describe('CoursesCardListComponent', () => {
  let component: CoursesCardListComponent;
  let fixture: ComponentFixture<CoursesCardListComponent>;
  let el: DebugElement;
  //   note:
  //   Now, notice that there are other ways of setting up component tests by default.
  // The angular clay is going to suggest you to split these before each block into two different steps when
  // a synchronous block for configuring the testing module and one synchronous block for setting up here.
  // The test variables I recommend that you use instead this consolidated form of a B for each block.
  // So there is only one asynchronous before each block and we initialize here our test variables in the
  // then clause of the promise returned by compile components.
  beforeEach(waitForAsync(//     ⁡⁣⁢⁢async⁡ is going to do is to wait for any asynchronous operations triggered by the code(all code  below as passed as an argument) that
  // we passed we to complete. // So  ⁡⁣⁢⁢async⁡ is going to wait for a predefined amount of time by default.
  //     The ⁡⁣⁢⁢async⁡ utility is going to keep track of every single one of those operations, and a sink is then
  // going to wait by default for five seconds for all those operations to complete before considering the
  // before each step has been completed.
  // So in the particular case of this code block, the only asynchronous operation that is getting triggered
  // here is this promise.
  // So a sink is going to detect that the promise was launched here and it's going to wait for the promise
  // to complete now because the compilation of our components takes a lot less than the default time out
  // of five seconds. That can be changed if necessary.
  () => {
    TestBed.configureTestingModule({
      // And alternative way is to list here all the components needed test by test.
      // If your application is already split up into several lazy loading modules, then you can import here
      // only the module that contains the component being tested.
      // Otherwise, if your application has a very large number of components, you might consider importing
      // here the components one by one.
      imports: [CoursesModule, RouterTestingModule, HttpClientTestingModule],
    })
      .compileComponents()
      .then(() => {
        // In order to create an instance of a component, we are going to need a ⁡⁣⁢⁢component fixture⁡.
        // So the ⁡⁣⁢⁢component fixture⁡ is a test utility type that is going to help us to do some common test operations, such as, for example, obtaining an instance of the component, debugging the component, etc. The
        // ⁡⁣⁢⁢component fixture⁡ type takes here a generic parameter type that is going to be the type of the component
        // itself.
        fixture = TestBed.createComponent(CoursesCardListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
      });
  }));

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should display the course list', () => {
    // One of the main points here is that there is no need to use by default any of the asynchronous testing
    // utilities such as async or fakeAsync.
    // If we don't need it, if we can make our test purely synchronous, then we should do so because that
    // is easier to retrieve and maintain.
    component.courses = setupCourses();

    // So after assigning any data to a component via an input property, we also need to notify the component
    // that some changes were made. We need to trigger the component change detection mechanism.
    console.log(
      'el.nativeElement.outerHTML before change detection',
      el.nativeElement.outerHTML
    );
    fixture.detectChanges();
    console.log(
      'el.nativeElement.outerHTML after change detection',
      el.nativeElement.outerHTML
    );

    const cards = el.queryAll(By.css('.course-card'));

    expect(cards).toBeTruthy('Could not find cards');
    expect(cards.length).toBe(16, 'Unexpected number of courses');
  });

  fit('should display the first course', () => {
    component.courses = setupCourses();

    fixture.detectChanges();

    const course = component.courses[0];

    const card = el.query(By.css('.course-card:first-child')),
      title = card.query(By.css('mat-card-title')),
      image = card.query(By.css('img'));

    expect(card).toBeTruthy('Could not find course card');

    expect(title.nativeElement.textContent).toBe(course.description);

    expect(image.nativeElement.src).toBe(course.iconUrl);
  });
});
