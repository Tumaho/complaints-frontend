import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MainService {
    
    isLoggedIn = false;

    constructor() { }


    setToken(token : any){
        localStorage.removeItem("token");
        localStorage.setItem("token",token);
    }


    setUserData(data : any){
        localStorage.removeItem("userData");
        localStorage.setItem("userId",data._id);
        localStorage.setItem("userRole",data.role);
        localStorage.setItem("userName",data.name);


    }
}
