import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthBarisService } from 'src/app/core/services/alternative-baris/auth-baris.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<boolean>();
  activeUser!: string;
  constructor(
    private authBarisService: AuthBarisService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActiveUser();
  }

  onToggeleSidenav() {
    // this.appSidenavComponent.toggle();
    this.sidenavToggle.emit();
  }
  /*
  original code
  */
  // onLogout() {
  //   this.authService.logout();
  //   this.router.navigate(['auth/login']);
  // }
  onLogout() {
    this.authBarisService.logout().subscribe(() => {
      this.router.navigate(['auth/login']);
    });
  }

  onFullscreenToggle() {
    const elem = <any>document.querySelector('.dashboard');

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.msRequestFullScreen) {
      elem.msRequestFullScreen();
    }
  }

  getActiveUser() {
    this.authBarisService.user$.pipe().subscribe((user) => {
      this.activeUser = user?.email;
    });
  }
}
