import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthSession } from '../services/auth-session.service';

@Directive({
  selector: '[appHasPermissions]'
})
export class HasPermissionsDirective implements OnInit {
  @Input() appHasPermissions!: string | string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private authSession: AuthSession
  ) {}

  ngOnInit() {
    const user = this.authSession.getUser();

    if (user.hasPermissions(this.appHasPermissions)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

}
