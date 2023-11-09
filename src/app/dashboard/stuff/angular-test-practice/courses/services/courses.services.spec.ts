import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpErrorResponse } from '@angular/common/http';
import { Course } from 'src/app/dashboard/course/model/course';
import { COURSES, findLessonsForCourse } from 'server/express/db-data';

describe('CoursesService', () => {
  let coursesService: CoursesService,
    httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      // caution: If your test involves HTTP requests, or if you want to test the behavior of the HttpClient directly, then you should use HttpClientTestingModule like below. If your test only involves code that calls methods on a service that uses HttpClient, then you may be able to use a spy object instead.
      providers: [CoursesService],
    });

    (coursesService = TestBed.get(CoursesService)),
      (httpTestingController = TestBed.get(HttpTestingController));
  });

  it('should retrieve all courses', () => {
    coursesService.findAllCourses().subscribe((courses) => {
      expect(courses).withContext('No courses returned').toBeTruthy();

      expect(courses.length)
        .withContext('incorrect number of courses')
        .toBe(16);

      const course = courses.find((course) => course.id == 12);

      expect(course?.description).toBe('Angular Testing Course');
    });

    // Mock Http Request
    const req = httpTestingController.expectOne('/api/courses');

    expect(req.request.method).toEqual('GET');

    // we are going to have it return some test data by calling flush
    //     The req.flush method is used in Angular unit tests to simulate an HTTP response for a request that was made using the HttpClient. The method is typically used to test services that make HTTP requests to a backend server.
    // The req.flush method accepts a single parameter that represents the response data that should be returned by the simulated HTTP request.
    req.flush({ payload: Object.values(COURSES) });
  });

  it('should find a course by id', () => {
    coursesService.findCourseById(12).subscribe((course) => {
      expect(course).toBeTruthy();
      expect(course.id).toBe(12);
    });

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('GET');

    req.flush(COURSES[12]);
  });

  it('should save the course data', () => {
    const changes: Partial<Course> = {
      description: 'Vue Testing Course',
    };

    coursesService
      .saveCourse(String(12), changes)
      .subscribe((course: Course) => {
        expect(course.id).toBe(12);
      });

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');

    // Let's check that. The description property that is getting sent to the server indeed contains the database to save course here in our second argument.
    // So with this, we are validating the body of the put request sent to the server.
    expect(req.request.body.description).toEqual(changes.description);

    // simulate response with modified data
    req.flush({
      ...COURSES[12],
      ...changes,
    });
  });

  it('should give an error if save course fails', () => {
    const changes: Partial<Course> = {
      description: 'React Testing Course',
    };

    coursesService.saveCourse(String(12), changes).subscribe({
      next: () => fail('the save course operation should have failed'),
      error: (error: HttpErrorResponse) => expect(error.status).toBe(500),
      // complete: () => console.info('complete'),
    });

    const req = httpTestingController.expectOne('/api/courses/12');

    expect(req.request.method).toEqual('PUT');

    req.flush('Save course failed', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('should find a list of lessons', () => {
    coursesService.findLessons(12).subscribe((lessons) => {
      expect(lessons).toBeTruthy();

      expect(lessons.length).toBe(3);
    });

    const req = httpTestingController.expectOne(
      (req) => req.url == '/api/lessons'
    );

    expect(req.request.method).toEqual('GET');
    expect(req.request.params.get('courseId')).toEqual(String(12)); // body of the http request only contains string and not other types
    expect(req.request.params.get('filter')).toEqual('');
    expect(req.request.params.get('sortOrder')).toEqual('asc');
    expect(req.request.params.get('pageNumber')).toEqual(String(0));
    expect(req.request.params.get('pageSize')).toEqual(String(3));

    req.flush({
      payload: findLessonsForCourse(12).slice(0, 3),
    });
  });

  afterEach(() => {
    // The httpTestingController.verify() method is called in the afterEach() hook to ensure that there are no outstanding requests that have not been handled or flushed. If there are any outstanding requests, the verify() method will throw an error, indicating that there are still unresolved requests.
    httpTestingController.verify();
    // example for outstanding requests:
    // it('should retrieve all courses', () => {
    //   // Make an HTTP request
    //   coursesService.findAllCourses().subscribe((courses) => {
    //     // Do something with the response
    //   });

    //   // No request is handled or flushed here!
    // });
    // // No afterEach hook is defined to verify outstanding requests
  });
});
