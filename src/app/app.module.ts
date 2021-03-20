import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AuthGuardService} from './service/auth/auth-guard.service'
import {AuthService} from './service/auth/auth.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import {MatTableModule} from '@angular/material/table';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateStatusComponent } from './components/update-status/update-status.component';





@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegisterComponent,
    ComplaintsComponent,
    DialogComponent,
    UpdateStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    MatDialogModule
  ],
  providers: [AuthGuardService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
