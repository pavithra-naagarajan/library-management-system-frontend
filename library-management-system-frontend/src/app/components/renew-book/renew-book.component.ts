import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-renew-book',
  templateUrl: './renew-book.component.html',
  styleUrls: ['./renew-book.component.css']
})
export class RenewBookComponent implements OnInit {
  mailId?:string
  renewForm?:FormGroup
    constructor(public router:Router,public userService:UserService,public issueBookService:IssueBookService,
      public activatedRoute:ActivatedRoute,
      public formBuilder:FormBuilder) { }
  
    ngOnInit(): void {
      this.mailId = this.activatedRoute.snapshot.params['mailId'];
      this.renewForm = this.formBuilder.group({
        bookId: ['', Validators.required],
       
        issueId: ['', Validators.required],
      })
  
  
    }
    renewBook(){
  this.issueBookService.updateDueDate(this.renewForm.get('issueId').value).subscribe(data=>{
  
  },error=>{
    this.successNotification()
  })
    }
    return(){
      this.router.navigate(['userfunctions',this.mailId])
    }
    successNotification(){
      Swal.fire('Success', 'Book Renewal finished Successfully!', 'success')
    }
  }

