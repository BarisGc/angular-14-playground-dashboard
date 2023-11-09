import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-counter-custom-two-way-example',
  templateUrl: './counter-custom-two-way-example.component.html',
  styleUrls: ['./counter-custom-two-way-example.component.scss'],
})
export class CounterCustomTwoWayExampleComponent implements OnInit {
  // #custom #customtwoway #customtwowaybinding #custom two way #custom twoway
  @Input() count = 0;
  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}

  increment() {
    this.count++;
    this.countChange.emit(this.count);
  }
}
