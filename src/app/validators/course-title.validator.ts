import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs';
import { CoursesService } from '../dashboard/course/services/courses.service';
export function courseTitleValidator(
  coursesService: CoursesService
): AsyncValidatorFn {
  // Just like in the case of synchronous validators, the return type of this function is going to be a function.
  // So let's annotate this with the type as sinc validator function.
  // So this is a function that returns another function when called the return function here is going to be the actual validator function.
  // So this function here course title validated is just used to create new instances of our validate function.

  return (control: AbstractControl) => {
    return coursesService.findAllCourses().pipe(
      map((courses) => {
        const course = courses.find(
          (course) =>
            course.description.toLocaleLowerCase('tr') ===
            control.value.toLocaleLowerCase('tr')
        );

        return course ? { courseTitleExists: true } : null;
      })
    );
  };
}
