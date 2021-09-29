import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IssueBookService } from 'src/app/services/issue-book.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {
mailId?:string
returnForm?:FormGroup
  constructor(public router:Router,public userService:UserService,public issueBookService:IssueBookService,public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.mailId = this.activatedRoute.snapshot.params['mailId'];
    this.returnForm = this.formBuilder.group({
      bookId: ['', Validators.required],
     
      issueId: ['', Validators.required],
    })


  }
  returnBook(){
this.issueBookService.deleteIssueDetails(this.returnForm.get('issueId').value).subscribe(data=>{

},error=>{
  this.successNotification()
})
  }
  return(){
    this.router.navigate(['userfunctions',this.mailId])
  }
  successNotification(){
    Swal.fire('Success', 'Book Returned Successfully!', 'success')
  }
}
