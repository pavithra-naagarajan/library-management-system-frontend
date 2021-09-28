import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IssueBook } from 'src/app/models/issue-book';
import { IssueBookService } from 'src/app/services/issue-book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-issued-details',
  templateUrl: './view-issued-details.component.html',
  styleUrls: ['./view-issued-details.component.css']
})
export class ViewIssuedDetailsComponent implements OnInit {

  show?:boolean;
  issuedDetails:IssueBook[]=[]
  issueId?:number
  userId?:number
  bookId?:number
  dueDate?:Date
  issueDate?:Date
  searchBy:String = "default";
textValue:any=null;
errorMessage?:string
searchByBookId?:FormGroup
searchByUserId?:FormGroup
searchByIssueId?:FormGroup
searchByIssueDate?:FormGroup
searchByDueDate?:FormGroup
  constructor(public router:Router,
    public issueBookService:IssueBookService,public formBuilder:FormBuilder
    ) { }

  ngOnInit(): void {
    this.viewIssuedBooks();
    this.searchByBookId = this.formBuilder.group({
      bookId: ['', Validators.required]
    })
    this.searchByUserId = this.formBuilder.group({
      userId: ['', Validators.required]
    })
    this.searchByIssueId = this.formBuilder.group({
      issueId: ['', Validators.required]
    })
    this.searchByIssueDate = this.formBuilder.group({
      issueDate: ['', Validators.required]
    })
    
    this.searchByDueDate = this.formBuilder.group({
      dueDate: ['', Validators.required]
    })
  
  }

    successNotification(){
      Swal.fire('Success', 'Book request sent Successfully!', 'success')
    }
    successFineNotification(){
      Swal.fire('Success', 'Fine Amount updated Successfully!', 'success')

    }
    viewIssuedBooks() {
      this.issueBookService.getAllIssuedDetails().subscribe(
        (res:any)=>{
         this.show=true
          this.issuedDetails=res
          console.log(res);
         
         
         
       }
      )}  


      updateFine(){
        this.issueBookService.updateFine(this.searchByIssueId.get('issueId').value).subscribe(data=>{
        },error=>{
          this.successFineNotification()
          this.viewIssuedBooks()

        })
      }
      getByUserId(){
        if(this.textValue == ""){
          this.viewIssuedBooks()
        }
        
        else{
          this.issueBookService.getIssueDetailsByUserId(this.searchByUserId.get('userId')?.value).subscribe((data:any[])=>{
            console.log(data);
            this.issuedDetails=data;
            if(this.issuedDetails == null){
              this.errorMessage = "No records found"
          }
          else{
            this.errorMessage = ""
          }
          }, error => {this.errorMessage = "No records found"}
          )
      }
      }
      getByDueDate(){
        console.log("inside due date")
        if(this.textValue == ""){
          this.viewIssuedBooks()
        }
        
        else{
          this.issueBookService.getIssueDetailsByDueDate(this.searchByDueDate.get('dueDate')?.value).subscribe((data:any[])=>{
            console.log(data);
            this.issuedDetails=data;
            if(this.issuedDetails == null){
              this.errorMessage = "No records found"
          }
          else{
            this.errorMessage = ""
          }
          }, error => {this.errorMessage = "No records found"}
          )
      }
      }
      getByIssueDate(){
        console.log("function")
        if(this.textValue == ""){
          this.viewIssuedBooks()
        }
        
        else{
          this.issueBookService.getIssueDetailsByIssueDate(this.searchByIssueDate.get('issueDate')?.value).subscribe((data:any[])=>{
            console.log("***********************"+this.searchByIssueDate.get('issueDate')?.value)
            console.log(data);
            this.issuedDetails=data;
            if(this.issuedDetails == null){
              this.errorMessage = "No records found"
          }
          else{
            this.errorMessage = ""
          }
          }, error => {this.errorMessage = "No records found"}
          )
      }
      }
      getByIssueId(){
    
        if(this.textValue == null){
          this.viewIssuedBooks()
        }
        else{
        this.issueBookService.getIssueDetailsByIssueId(this.searchByIssueId.get('issueId')?.value).subscribe((data)=>{
          console.log(data);
          this.issuedDetails=[];
          this.issuedDetails[0]=data;
          if(this.issuedDetails[0].issueId == 0){
            this.errorMessage = "No records found"
            this.issuedDetails=[];
          }
          else{
            this.errorMessage = ""
          }
        }, error => {this.errorMessage = "No records found"}
        )
      }
      }
      getByBookId(){
    
        if(this.textValue == null){
          this.viewIssuedBooks()
        }
        else{
        this.issueBookService.getIssueDetailsByBookId(this.searchByBookId.get('bookId')?.value).subscribe((data)=>{
          console.log(data);
          this.issuedDetails=[];
          this.issuedDetails[0]=data;
          if(this.issuedDetails[0].issueId == 0){
            this.errorMessage = "No records found"
            this.issuedDetails=[];
          }
          else{
            this.errorMessage = ""
          }
        }, error => {this.errorMessage = "No records found"}
        )
      }
      }
  return(){
this.router.navigate(['adminfunctions'])
  }
}
