import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.css']
})
export class UpdateStatusComponent implements OnInit {

  status: any = ['pending', 'resolved', 'dismissed'];
  newStatus: any = "";

  httpOptions = {
    headers: new HttpHeaders({ 'auth-token': localStorage.getItem("token") || "" })
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<UpdateStatusComponent>) { }

  ngOnInit(): void {

  }

  onSubmit(e: any) {
    if (this.newStatus == "") {
      let snackBarRef = this.snackBar.open('Inputs must filled', 'ok', {
        duration: 2000,
      });
    }
    else {
      this.updateNewStatus();
      this.dialogRef.close();
    }

  }


  changeStatus(e: any) {
    this.newStatus = e;
  }


  updateNewStatus() {
    this.http.put('http://localhost:8080/api/comp',
      {
        "compId": this.data.dataKey._id,
        "status": this.newStatus
      }, this.httpOptions).subscribe(res => {

      })
  }

}
