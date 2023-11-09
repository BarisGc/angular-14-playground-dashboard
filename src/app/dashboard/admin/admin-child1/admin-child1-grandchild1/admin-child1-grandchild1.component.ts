import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-child1-grandchild1',
  templateUrl: './admin-child1-grandchild1.component.html',
  styleUrls: ['./admin-child1-grandchild1.component.scss'],
})
export class AdminChild1Grandchild1Component implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log('AdminChild1Grandchild1Component ngOnInit()');
  }

  // #navigate #relative #required parameters #optional parameters #queryparams #query params #query parameters #routing
  goBackToAdminChild2() {
    const data = { name: 'abc', id: '123' };
    const navigationExtras: NavigationExtras = {
      relativeTo: this.route,
      queryParams: {
        data: JSON.stringify(data),
      },
      state: {
        age: 987,
      },
    };
    this.router.navigate(
      [
        // required parameters /books/child2
        '../../child2',
        // #optional parameters /books;title=young;gender=true
        { title: 'young', gender: 'man' },
      ],
      navigationExtras
      // if only queryParams, dont add other properties like relativeTo, state etc., just pass {queryParams:data} instead of navigationExtras variable
    );
    // this.router.navigate(['..'], {relativeTo: this.route}); // navigate to root parent directly
  }
}
