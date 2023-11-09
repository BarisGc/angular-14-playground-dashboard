import { Component, ContentChild, OnInit } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  constructor() {}
  @ContentChild(RoomsComponent) rooms!: RoomsComponent;

  ngOnInit(): void {}

  ngAfterContentInit() {
    console.log('ngAfterContentInit-container', 'rooms', this.rooms);
  }
}
