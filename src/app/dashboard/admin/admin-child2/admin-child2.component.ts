import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-child2',
  templateUrl: './admin-child2.component.html',
  styleUrls: ['./admin-child2.component.scss'],
})
export class AdminChild2Component implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(
      'this.router.getCurrentNavigation()?.extras.state',
      this.router.getCurrentNavigation()?.extras.state
    );
    console.log(
      "this.route.snapshot.paramMap.get('title')",
      this.route.snapshot.paramMap.get('title')
    );
    console.log(
      "this.route.snapshot.queryParamMap.get('title')",
      this.route.snapshot.queryParamMap.get('title')
    );
  }

  ngOnInit(): void {}
}
