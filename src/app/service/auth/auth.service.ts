import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()


export class AuthService {
  constructor(public router: Router) { }


  public isAuthenticated(): boolean {
    let token = localStorage.getItem('token');
    // Check whether the token is expired and return
    // true or false
    if (token)
      return true;
    return false;
  }
}