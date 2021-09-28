import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestBook } from 'src/app/models/request-book';
import { RequestBookService } from 'src/app/services/request-book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {

  show?:boolean;
  bookRequests:RequestBook[]=[]
  constructor(public router:Router,
    public requestBookService:RequestBookService,
    ) { }

  ngOnInit(): void {
    this.viewRequestBooks();
  
  
  }

    successNotification(){
      Swal.fire('Success', 'Book request sent Successfully!', 'success')
    }
    viewRequestBooks() {
      this.requestBookService.getAllRequestBookDetails().subscribe(
        (res:any)=>{
         this.show=true
          this.bookRequests=res
          console.log(res);
         
         
         
       }
      )}  
  approveRequest(userId:number,bookId:number,numberOfDays:number,requestId:number){
this.router.navigate(['issuebook',userId,bookId,numberOfDays,requestId])
  }
  return(){
    this.router.navigate(['adminfunctions'])
  }
}
