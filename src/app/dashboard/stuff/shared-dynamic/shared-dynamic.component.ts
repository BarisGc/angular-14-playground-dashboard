import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-dynamic',
  template: `
    <ul>
    <li>Lessons</li>
    <!-- <li *rbacAllow="['admin']">{{ "Admin" }}</li> -->
    <li>Sign Up</li>
    <li>Login</li>
    <li>Logout</li>
  </ul>
  `,
  styles: [
  ]
})
export class SharedDynamicComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
