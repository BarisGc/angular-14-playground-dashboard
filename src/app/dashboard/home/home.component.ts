import { Component } from '@angular/core';

// #Keywords: #ngTemplateOutlet, #ngTemplateOutletContext, #$implicit
@Component({
  selector: 'app-home',
  template: ` <ng-container
      *ngFor="let menuItem of menuList"
      [ngTemplateOutlet]="menuTemplate"
      [ngTemplateOutletContext]="{
        $implicit: menuItem
      }"
    >
    </ng-container>
    <ng-template #menuTemplate let-menuItem
      ><mat-menu #menu="matMenu">
        <ng-container *ngFor="let menuItemChild of menuItem.children">
          <button mat-menu-item [ngClass]="['custom-menu-item']">
            {{ menuItemChild.name }}
          </button>
        </ng-container>
      </mat-menu>
      <button
        mat-button
        [matMenuTriggerFor]="menu"
        [ngClass]="['custom-menu-trigger']"
      >
        {{ menuItem.name }}
      </button>
    </ng-template>`,
  styles: [
    `
      .custom-menu-item {
        color: violet;
      }

      .custom-menu-trigger {
        color: teal;
      }
    `,
  ],
})
export class HomeComponent {
  menuList = [
    {
      id: 0,
      name: 'menu1',
      children: [
        { id: 0, name: 'menu1-1' },
        { id: 1, name: 'menu1-2' },
        { id: 2, name: 'menu1-3' },
      ],
    },
    {
      id: 1,
      name: 'menu2',
      children: [
        { id: 0, name: 'menu2-1' },
        { id: 1, name: 'menu2-2' },
      ],
    },
  ];
}
