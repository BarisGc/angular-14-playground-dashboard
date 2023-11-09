import { AuthBarisService } from '../../../../core/services/alternative-baris/auth-baris.service';
import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';

// #structuraldirective #structural directive #TemplateRef #ViewContainerRef
@Directive({
  selector: '[rbacAllow]',
})
export class RbacAllowDirective implements OnDestroy {
  allowedRoles!: string[];
  user: any;
  sub!: Subscription;
  // note: if you want to initialize and if you dont use ngoninit or ?. in ngondestroy; private subscription: Subscription = new Subscription();

  constructor(
    private templateRef: TemplateRef<any>,
    // note: We can use the ViewChild decorator to grab any element in our view and read him as ViewContainerRef
    //     And that's what ViewContainerRef is:
    // A DOM element (container) where I can put your newly component as a sibling to this element.
    // note: viewContainer can contain host views (created by instantiating a component with the createComponent() method), and embedded views (created by instantiating a TemplateRef with the createEmbeddedView() method).
    // Each ViewContainer can have only one anchor element and each anchor element can only have a single ViewContainer. ViewContainer is a container that helps you to manipulate Views(ViewRef, EmbeddedViewRef)
    // ViewContainerRef and TemplateRef are refering to the same comment tag monosnap.com/file/gTzAjV2beEJm7Yp4Ujetleja7gHvpw But TemplateRef stores in its instance information about embedded template
    private viewContainer: ViewContainerRef,
    private authBarisService: AuthBarisService
  ) {}

  // Note: use ngOnChanges({ name, email }: SimpleChanges) Hook  instead of setter , when Dealing with multiple Inputs(this is  an uncommon case)
  //   caution:
  //   There is one important thing in case of setter: Props injected with setter should consider the matter of order
  // <child [item1]="item1" [item2]="item2"></child>
  // <child [item2]="item2" [item1]="item1"></child>
  // // not same if you use setter
  // So if item2 is setters, item1 some data and you use item1 in item2 it works fine because setter calls the moment value sets, once you change the input order in app template reversed, the app will crash hard because the time item2 is set, item1 is undefined..
  @Input()
  set rbacAllow(allowedRoles: string[]) {
    this.allowedRoles = allowedRoles;
    this.showIfUserAllowed();
  }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    let subs$ = this.authBarisService.user$.subscribe((user) => {
      this.user = user;
      this.showIfUserAllowed();
    });
    this.sub?.add(subs$);
  }

  showIfUserAllowed() {
    if (this.viewContainer.length > 0) return;

    if (!this.allowedRoles || this.allowedRoles.length === 0 || !this.user) {
      this.viewContainer.clear();
      return;
    }

    const isUserAllowed = this.user?.roles.find((role: string) =>
      this.allowedRoles.includes(role)
    );

    if (isUserAllowed) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
