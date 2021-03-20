import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(private http: HttpClient,private snackBar: MatSnackBar,public dialogRef: MatDialogRef<DialogComponent>) { }
  types: any = ['Public Multi-Media Complaint', 'Serial Complaint','First-time complaint','Personnel Complaint','Product Specific Complaint','Wait – Times Complaint' ,'misunderstanding Complaint'];
  finalType: any ="";
  userId : any = localStorage.getItem("userId");
  httpOptions = {
    headers: new HttpHeaders({ 'auth-token': localStorage.getItem("token") || "" })
  };
  ngOnInit(): void {
    
  }

  onSubmit(e:any){
    if(e.target.complaint.value == "" || this.finalType==""){
      let snackBarRef = this.snackBar.open('Inputs must filled', 'ok',{
        duration: 2000,
      });
    }
    else{this.addComplaint(e.target.complaint.value);
    this.dialogRef.close();}
    
  }
  
  changeType(e: any) {
    this.finalType = e;
  }


  addComplaint(complaint : any){
    this.http.post('http://localhost:8080/api/comp',
    {

        "descreption": complaint,
        "status": "pending",
        "compType": this.finalType,
        "createrId": this.userId
    
    }, this.httpOptions).subscribe(res =>{

    },err=>{
      
    })
  }

}