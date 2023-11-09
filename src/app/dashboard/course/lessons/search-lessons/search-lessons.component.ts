import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LessonsService } from '../services/lessons.service';
import { Lesson } from '../models/lesson';

/**
 * @keywords search, master detail pattern, local state
 */
@Component({
  selector: 'app-search-lessons',
  templateUrl: './search-lessons.component.html',
  styleUrls: ['./search-lessons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchLessonsComponent implements OnInit {
  // note:
  /*
  In this particular case, in order to share the data between the top level smart component and the presentational lesson component, we simply had to use a local member variable and an angular component input.
  So as you can see, the data is getting past to the presentational component using the active lesson
  member variable. In this particular case, because we were passing data to a presentational component using angular inputs, we did not have to use a shared service. Notice also that we did not use centralized state management. Instead, we have used state that is only present at the level of a particular component.
  This has the added advantage that when the component gets destroyed, the state also gets destroyed.
  And that's a very good feature to have. In the particular case, for example, of search results, we would indeed like the search results to get erased from memory whenever we navigate away from the search screen.
  */

  searchResults$!: Observable<Lesson[]>;

  activeLesson!: Lesson | null;
  constructor(private lessonsService: LessonsService) {}

  ngOnInit(): void {
    console.log('SearchLessonsComponent')
  }

  onSearch(search: string) {
    this.searchResults$ = this.lessonsService.searchLessons(search);
  }
  openLesson(lesson: Lesson) {
    this.activeLesson = lesson;
  }
  onBackToSearch() {
    this.activeLesson = null;
  }
}
