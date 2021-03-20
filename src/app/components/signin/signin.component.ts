import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MainService } from '../../app-service'
import { Router } from '@angular/router';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  localUrl = 'http://localhost:8080/api/user/login';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private snackBar: MatSnackBar, private mainService: MainService, private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(e: any) {
    if (e.target.Username.value == "" || e.target.Password.value == "") {
      let snackBarRef = this.snackBar.open('Inputs must filled', 'ok', {
        duration: 3000,
      });
    }
    else {
      this.http.post<any>(this.localUrl,
        {

          "email": e.target.Username.value,
          "password": e.target.Password.value

        },
        this.httpOptions
      ).subscribe(data => {
        console.log("LOGIN DATA : ", data.status);
        this.mainService.setToken(data.data.token);
        this.mainService.setUserData(data.data.user);
        this.router.navigateByUrl('/complaints');
      }, error => {
        let snackBarRef = this.snackBar.open('Username or password is incorrect', 'ok', {
          duration: 2000,
        });

      })

    }
  }

}
