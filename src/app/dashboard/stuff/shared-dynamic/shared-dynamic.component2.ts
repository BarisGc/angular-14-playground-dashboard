import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shared-dynamic2',
  template: `
    <ul>
      <li>Lessons</li>
      <!-- <li *rbacAllow="['admin']">{{ "Admin" }}</li> -->
      <li>Sign Up</li>
      <li>Login</li>
      <li>Logout</li>
      {{
        'message' + ' ' + message
      }}
    </ul>
  `,
  styles: [],
})
export class SharedDynamicComponent2 implements OnInit {
  message!: string;
  constructor() {}

  ngOnInit(): void {}
}
