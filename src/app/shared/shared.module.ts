import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { FileUploadPreviewComponent } from './components/file-upload-preview/file-upload-preview.component';
import { DndDirective } from './components/file-upload-preview/dnd.directive';
import { ConfirmDialogComponent } from './utils/dialogs/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './utils/dialogs/alert-dialog/alert-dialog.component';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { OnlyOneErrorPipe } from '../pipes/only-one-error.pipe';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MessagesComponent } from './components/messages/messages.component';
import { RbacAllowDirective } from '../dashboard/stuff/custom-directives/directives/rbac-allow.directive';
import { NgSelectModule } from '@ng-select/ng-select';

const COMPONENTS = [
  AlertDialogComponent,
  ConfirmDialogComponent,
  FileUploadPreviewComponent,
  FileUploadComponent,
  LoadingComponent,
  MessagesComponent,
  SafeUrlPipe,
  OnlyOneErrorPipe,
];

const DIRECTIVES = [RbacAllowDirective, DndDirective];
const PIPES: any[] = [];

@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [CommonModule, MaterialModule, NgSelectModule],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PerfectScrollbarModule,
    NgSelectModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
  ],
  entryComponents: [AlertDialogComponent, ConfirmDialogComponent],
})
export class SharedModule {}
