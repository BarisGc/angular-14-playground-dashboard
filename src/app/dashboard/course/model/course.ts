export interface Course {
  id: number;
  description: string;
  longDescription: string;
  iconUrl: string;
  courseListIcon: string;
  category: string;
  lessonsCount: number;
  seqNo: number;
  url: string;
  price: number;
}

export function sortCoursesBySeqNo(c1: Course, c2: Course) {
  return c1.seqNo - c2.seqNo;
}
