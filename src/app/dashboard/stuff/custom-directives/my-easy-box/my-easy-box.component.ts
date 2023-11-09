import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-easy-box',
  templateUrl: './my-easy-box.component.html',
  styleUrls: ['./my-easy-box.component.scss']
})
export class MyEasyBoxComponent implements OnInit {
  test = "test"
  constructor() { }

  ngOnInit(): void {
  }

}
