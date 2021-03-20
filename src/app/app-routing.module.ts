import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import {ComplaintsComponent} from './components/complaints/complaints.component'
import {AuthGuardService} from './service/auth/auth-guard.service'
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: SigninComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'complaints',
    component: ComplaintsComponent,
    canActivate: [AuthGuardService],
    data:{header:false}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }