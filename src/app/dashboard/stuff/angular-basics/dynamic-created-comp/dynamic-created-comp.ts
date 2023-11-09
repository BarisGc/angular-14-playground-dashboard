import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  template: `
    <p>this is dynamically created component template</p>
    <p>{{ dynamicCreatedCompInputFromParent }}</p>
  `,
  styles: [],
})
export class DynamicCreatedComp implements OnInit {
  dynamicCreatedCompInputFromParent!: string;

  constructor() {}

  ngOnInit(): void {}
}
