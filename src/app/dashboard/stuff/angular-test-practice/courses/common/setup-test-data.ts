import { Course } from '../model/course';
import { sortCoursesBySeqNo } from '../home/sort-course-by-seq';
import { COURSES } from 'server/express/db-data';

export function setupCourses(): Course[] {
  const courses = Object.values(COURSES) as Course[];
  return courses.sort(sortCoursesBySeqNo) as Course[];
}
