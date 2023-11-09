import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss'],
})
export class Child1Component {
  @Input() item = '';
  constructor() {
    console.log('child1 constructor');
  }
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() deleteSearchedItemEvent = new EventEmitter<string>();
  changeLog: string[] = [];

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      const cur = chng.currentValue;
      const prev = chng.previousValue;
      this.changeLog.push(
        `${propName}: currentValue = ${cur}, previousValue = ${prev}`
      );
    }
  }

  addNewItem(value: string) {
    this.newItemEvent.emit(value);
  }
  deleteSearchedItem(value: string) {
    this.deleteSearchedItemEvent.emit(value);
  }

  // _______________________________________________________ //

  @Input() size!: number | string;
  @Output() sizeChange = new EventEmitter<number>();

  dec() {
    this.resize(-1);
  }
  inc() {
    this.resize(+1);
  }

  resize(delta: number) {
    this.size = Math.min(40, Math.max(8, +this.size + delta));
    this.sizeChange.emit(this.size);
  }

  ngOnInit() {
    console.log('child1 ngOnInit');
  }
  ngAfterContentInit() {
    console.log('child1 ngAfterContentInit');
  }

  ngAfterViewInit() {
    console.log('child1 ngAfterViewInit');
  }
}
