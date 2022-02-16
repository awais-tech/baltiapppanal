import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutRoutes } from './auth-layout.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularToastifyModule } from 'angular-toastify';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,ReactiveFormsModule,
    ToastrModule.forRoot(), 
    AngularToastifyModule,
    MatSnackBarModule

    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  // providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthLayoutModule { }
