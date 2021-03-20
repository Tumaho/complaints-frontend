import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MainService } from 'src/app/app-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  User: any = ['Admin', 'Customer'];

  selectedRole: any="";

  localUrl = 'http://localhost:8080/api/user/register';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private mainService: MainService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(e: any) {
    if(e.target.name.value=="" || e.target.name.value=="" || e.target.password.value==""||e.target.rePassword.value==""||this.selectedRole==""){
      let snackBarRef = this.snackBar.open('Inputs must filled', 'ok',{
        duration: 2000,
      });
    }

    else if (!(e.target.password.value == e.target.rePassword.value)) {
      let snackBarRef = this.snackBar.open('Password not matching', 'ok',{
        duration: 2000,
      });
    }
    else {
      this.http.post<any>(this.localUrl,
        {
          "name": e.target.name.value,
          "email": e.target.email.value,
          "password": e.target.password.value,
          "role": this.selectedRole

        },
        this.httpOptions
      ).subscribe(data => {

        let snackBarRef = this.snackBar.open('User Registred Successully', 'ok',{
          duration: 2000,
        });
        this.router.navigateByUrl('/signin');
      }, error => {
        let snackBarRef = this.snackBar.open('something goes wrong', 'ok',{
          duration: 2000,
        });

      })
    }



  }

  changeRole(e: any) {
    this.selectedRole = e;
  }
  

}