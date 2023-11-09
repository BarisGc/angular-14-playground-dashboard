import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from '../lessons/models/lesson';
import { CoursesService } from '../services/courses.service';
import { Course } from '../model/course';
import { combineLatest, map, Observable, startWith, tap } from 'rxjs';

interface CourseData {
  course: Course;
  lessons: Lesson[];
}

/**
 * @keywords single data observable pattern, OnPush change detection

 */
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailComponent implements OnInit {
  data$!: Observable<CourseData>;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit() {
    console.log(
      'CourseDetailComponent ngOnInit() this.route.snapshot.data',
      this.route.snapshot.data
    );
    const courseId = parseInt(this.route.snapshot.paramMap.get('courseId')!);

    const course$ = this.coursesService.loadCourseById(courseId).pipe(
      startWith(null) // important to prevent initial black screen
      // startWith(null as any) or startWith({}) // if ide false signature error occurs
    );

    const lessons$ = this.coursesService.loadAllCourseLessons(courseId).pipe(
      startWith([]) // important to prevent initial black screen
    );

    this.data$ = combineLatest([course$, lessons$]).pipe(
      map(([course, lessons]) => {
        return {
          course,
          lessons,
        };
      }),
      tap(console.log)
    );
  }

  /* note1; single data observable pattern:
    // So if we refresh here the page, we can see that we get here an initial blank screen.

    // And only when the data observably meets its first value do we then display the data to the user.

    // So this is not the behavior that we would want.

    // The course data is available much sooner than the lessons data in our application.

    // So we would like to be able to display to the user the course title and the thumbnail while the lessons

    // are still rolling.

    // This means that we would like our data observable to emit Tuvalu's when initial value containing only

    // the course once it's available and a second value containing both the course and the lessons.

    // Once the lessons are available from the back ends, let's see how can we achieve that?
  */
  /*
    // note2: OnPush change detection:
    // It's important to understand that for most cases, default change detection is going to work great for

    // the majority of cases.

    // It's only when you have a lot of data to show to the user with a lot of template expressions that it

    // might become a problem in those rare cases where the amount of data that we are trying to display makes

    // the UI less responsive, we might want to switch some of the components of our application to use ANGULAR

    // on push change detection with unposed change detection.

    // ANGULAR is only going to update the component if we push new data to it explicitly.

    // So Angular is not going to check all the expressions by default instead of angular is going to wait

    // for data to be explicitly pushed to the component before re rendering it.

    // There are a couple of ways of pushing data to a component.

    // One way is through the use of angular input properties such as, for example, here that causes input

    // of the course.

    // Carlist component in unposed change detection ANGULAR is going to detect if some of the input properties

    // of certain components change or not and based on detecting are not a change angle.

    // Angular is going to decide if the component needs to be rear ended.

    // Another way that ANGULAR has to detect if some data is being pushed to a component is by checking if

    // any of the observables that the angular template has subscribed to has emitted a new value.

    // So those are the two ways that ANGULAR has available in order to detect if some new data is being pushed

    // to the component.
  */
}
