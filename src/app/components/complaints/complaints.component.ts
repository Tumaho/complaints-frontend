import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { UpdateStatusComponent } from '../update-status/update-status.component';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'complaint', 'complaintType', 'creationDate', 'status', 'update','delete'];
  dataSource!: MatTableDataSource<any>;
  role: any = localStorage.getItem("userRole");
  userId: any = localStorage.getItem("userId");
  userName: any = localStorage.getItem("userName");
  isCustomer: Boolean = false;
  constructor(private router: Router, private http: HttpClient, public dialog: MatDialog,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (this.role == "Customer") {
      this.getComplaintById(this.userId);
      this.isCustomer = true;
    }
    else if (this.role == "Admin") {
      this.getComplaint();
      this.isCustomer = false;
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'auth-token': localStorage.getItem("token") || "" }),
    headers1: new HttpHeaders({responseType: 'text'})
  };

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");

    this.router.navigate(['signin']);
  }

  async getComplaint() {
    await this.http.get<any[]>('http://localhost:8080/api/comp', this.httpOptions).subscribe((comp: any) => {
      this.dataSource = new MatTableDataSource(comp.data)
      console.log(this.dataSource)
    })
  }

  async getComplaintById(id: any) {
    await this.http.get<any[]>('http://localhost:8080/api/comp/' + id, this.httpOptions).subscribe((comp: any) => {
      this.dataSource = new MatTableDataSource(comp.data)
      console.log(this.dataSource)
    })
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      height: '400px',
      width: '600px',

    }).afterClosed().subscribe(result => {
      if (this.role == "Customer") {
        this.getComplaintById(this.userId);
      }
      else if (this.role == "Admin") {
        this.getComplaint();
      }
      let snackBarRef = this.snackBar.open('Complaint Added', 'ok',{
        duration: 2000,
      });
    })

  }


  updateStatus(element: any) {
    console.log("ELEMENT : ", element._id);

    this.dialog.open(UpdateStatusComponent, {
      height: '200px',
      width: '300px',
      data: {
        dataKey: element
      }

    }).afterClosed().subscribe(result => {
      if (this.role == "Customer") {
        this.getComplaintById(this.userId);
      }
      else if (this.role == "Admin") {
        this.getComplaint();
      }
      let snackBarRef = this.snackBar.open('Status Updated', 'ok',{
        duration: 2000,
      });
    })
  }


  async delete(id:string){
    await this.http.delete<any>('http://localhost:8080/api/comp/'+id,this.httpOptions).subscribe(res=>
    {
      if (this.role == "Customer") {
        this.getComplaintById(this.userId);
      }
      else if (this.role == "Admin") {
        this.getComplaint();
      }
      let snackBarRef = this.snackBar.open('Complaint Deleted', 'ok',{
        duration: 2000,
      });
    })
  }

}
