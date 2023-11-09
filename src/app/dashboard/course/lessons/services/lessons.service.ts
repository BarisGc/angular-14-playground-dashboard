import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Lesson } from '../models/lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonsService {
  constructor(private http: HttpClient) {}

  searchLessons(search: string) {
    return this.http
      .get<Lesson[]>('/api/lessons', {
        params: {
          filter: search,
          pageSize: '100',
        },
      })
      .pipe(
        tap((res) => console.log('searchLessons', res)),
        map((res: any) => res['payload']),
        shareReplay(1)
      );
  }
}
