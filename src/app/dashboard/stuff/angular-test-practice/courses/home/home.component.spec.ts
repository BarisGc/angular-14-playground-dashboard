import {
  ComponentFixture,
  fakeAsync,
  flush,
  flushMicrotasks,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { CoursesModule } from '../courses.module';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { setupCourses } from '../common/setup-test-data';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { click } from '../common/test-utils';
import { CoursesService } from '../services/courses.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let el: DebugElement;
  let coursesService: any;

  const beginnerCourses = setupCourses().filter(
    (course) => course.category == 'BEGINNER'
  );

  const advancedCourses = setupCourses().filter(
    (course) => course.category == 'ADVANCED'
  );

  // note: Now the question is, why does the test zone exist when compared to fixing and why are we using it here
  // at the level of the before each block?
  // Well, one major feature of the async test zone that focusing does not have is that async supports actual
  // HTTP requests.
  // So if by some reason you need to write a test that is actually not a unit test, but, for example,
  // an integration test that is doing actual HTP calls to a backend that would not be possible with fake
  // async, the goal of fixing is to write our code in a fully synchronous way, like we see here with the
  // assertions in the test body.
  // And having our component do an actual HTP call to a backend would not allow us to do that.
  // So if we have to test the component that is doing an actual HTP, we and call, then in that case we
  // need to use the async test zone and not fake a sink
  beforeEach(waitForAsync(() => {
    const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [
      'findAllCourses',
    ]);

    TestBed.configureTestingModule({
      // ⁡⁣⁢⁢NoopAnimationsModule⁡: it can be useful to use this module in Angular 2 tests because animations can introduce timing issues and make it harder to write reliable, repeatable tests.
      imports: [
        CoursesModule,
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      // caution: If your test involves HTTP requests, or if you want to test the behavior of the HttpClient directly, then you should use HttpClientTestingModule. If your test only involves code that calls methods on a service that uses HttpClient, then you may be able to use a spy object instead like below
      providers: [{ provide: CoursesService, useValue: coursesServiceSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        coursesService = TestBed.inject(CoursesService);
      });
  }));

  fit('should create the component', () => {
    expect(component).toBeTruthy();
  });

  fit('should display only beginner courses', () => {
    // A spy can be made to return a preset/fixed value (without the need for calling the actual methods using and.callThrough()). This can be achieved by chaining the spyOn() function with ⁡⁣⁢⁢𝗮𝗻𝗱.𝗿𝗲𝘁𝘂𝗿𝗻𝗩𝗮𝗹𝘂𝗲()⁡.
    // ⁡⁣⁢⁢and.returnValue()⁡ method is used to make the asynchronous findAllCourses() method of the CoursesService synchronous in this test. By returning an Observable using the of() method from RxJS, the findAllCourses() method no longer requires any asynchronous operations such as HTTP requests or Promises, and instead will immediately return the defined beginnerCourses array. This allows the test to be written synchronously, without requiring the use of async/await or Promises.
    coursesService.findAllCourses.and.returnValue(of(beginnerCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).withContext('expected to find 1 tab').toBe(1);
  });

  fit('should display only advanced courses', () => {
    coursesService.findAllCourses.and.returnValue(of(advancedCourses));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).withContext('expected to find 1 tab').toBe(1);
  });

  fit('should display both tabs', () => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    expect(tabs.length).withContext('Expected to find 2 tabs').toBe(2);
  });

  // settimeout + done: DoneFn combine is not preferred way since not maintainable
  // since most of all, we are not aware of the internal details of the component that we are testing.
  // We don't know in this type of code if the component calls request animation, frame set time timeout
  // or any other asynchronous EPA, we simply test the functionality, just like if it would be synchronous
  // functionality.
  fit('should display advanced courses when tab clicked with "done:DoneFn"', (done: DoneFn) => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    click(tabs[1]);

    fixture.detectChanges();

    // ⁡⁢⁣⁢caution:⁡ at this point that we then realized that here at this specific point in the test, it was
    // not possible to confirm that the advanced courses were getting displayed.
    // So these assertions here, if they were to be added directly here at this point in the test immediately
    // after calling detect changes, the assertions would not return the expected results.
    // And this is because the component that we are testing uses here, this material type group component,
    // which has some asynchronous behavior built in.
    // So this component uses internally request animation frame in order to create here a smooth animation
    // in this transition between course lists.
    // So the use of these asynchronous broza prevents us from writing this test in a synchronous way.
    // So we ended up here calling set timeout, waiting for the animation to complete, and then here inside
    // the body of said timeout, we are then going to assert that indeed the advanced courses are now getting
    // displayed on the screen and after that we are then going to call the Jasmyn, then callback.

    setTimeout(() => {
      const cardTitles = el.queryAll(By.css('.mat-card-title'));

      console.log(cardTitles);

      expect(cardTitles.length)
        .withContext('Could not find card titles')
        .toBeGreaterThan(0);
      expect(cardTitles[1].nativeElement.textContent).toContain(
        'Reactive Angular Course'
      );

      done();
    }, 500);
  });
  it('should display advanced courses when tab clicked - fakeAsync', fakeAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    click(tabs[1]);

    fixture.detectChanges();

    flush();

    const cardTitles = el.queryAll(
      By.css('.mat-mat-tab-label-body-active .mat-card-title')
    );

    console.log(cardTitles);

    expect(cardTitles.length)
      .withContext('Could not find card titles')
      .toBeGreaterThan(0);

    expect(cardTitles[2].nativeElement.textContent).toContain(
      'Angular Router In Depth'
    );
  }));

  it('should display advanced courses when tab clicked - waitForAsync', waitForAsync(() => {
    coursesService.findAllCourses.and.returnValue(of(setupCourses()));

    fixture.detectChanges();

    const tabs = el.queryAll(By.css('.mat-tab-label'));

    click(tabs[1]);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      console.log('called whenStable() ');

      const cardTitles = el.queryAll(
        By.css('.mat-mat-tab-label-body-active .mat-card-title')
      );

      expect(cardTitles.length)
        .withContext('Could not find card titles')
        .toBe(0);

      expect(cardTitles[3].nativeElement.textContent).toContain(
        'RxJs In Practice Course'
      );
    });
  }));
});
