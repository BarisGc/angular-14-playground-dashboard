import { Request, Response } from "express";
import { COURSES } from "./db-data";

export function getAllCourses(req: Request, res: Response) {

  setTimeout(() => {
    console.log('Returning courses ...');
    res.status(200).json({ payload: Object.values(COURSES) });
  }, 1500);
}

export function getCourseById(req: Request, res: Response) {
  const courseId = +req.params["courseId"];

  const courses: any = Object.values(COURSES);

  const course = courses.find((course:any) => course.id == courseId);

  res.status(200).json(course);
}
