import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthBarisService } from 'src/app/core/services/alternative-baris/auth-baris.service';

@Component({
  selector: 'app-admin-child1',
  templateUrl: './admin-child1.component.html',
  styleUrls: ['./admin-child1.component.scss'],
})
export class AdminChild1Component implements OnInit {
  impersonatedUser = {
    email: 'student@gmail.com',
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authBarisService: AuthBarisService
  ) {}

  ngOnInit(): void {}

  goToGrandChild1() {
    this.router.navigate(['grandchild1'], { relativeTo: this.route });
  }

  loginAsUser(impersonatedUserEmail: string) {
    this.authBarisService.loginAsUser(impersonatedUserEmail);
  }
}
