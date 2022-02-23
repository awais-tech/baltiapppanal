import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './pages/register/register.component';
import { AngularToastifyModule, ToastService } from 'angular-toastify';
import { ApicallingService } from './apicalling.service';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { LoginsroleGuard } from './loginsrole.guard';
import {MatSelectModule} from '@angular/material/select';




@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    MatFormFieldModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularToastifyModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    ToastrModule.forRoot(), 
    MatSnackBarModule ,
    MatProgressSpinnerModule,
  
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,

  
  ],
  providers: [ApicallingService,ToastService,LoginsroleGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
