import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [
    {
      provide: 'TokenA',
      useValue: 'this is TokenA which is provided in rooms component',
    },
  ],
})
export class RoomsComponent implements OnInit {
  title = 'Rooms';
  constructor() {}

  ngOnInit(): void {}
}
