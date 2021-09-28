import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService} from 'src/app/services/book.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.css']
})
export class ViewBooksComponent implements OnInit {

  show?:boolean;
books:Book[]=[]
isbn?:number
bookId?:number
publisher?:string
searchBy:String = "default";
textValue:any=null;
errorMessage?:string
searchByBookId?:FormGroup
searchByISBN?:FormGroup
searchByPublisher?:FormGroup
constructor(public router:Router,public bookService:BookService,public formBuilder:FormBuilder) { }

  ngOnInit(): void {
  
    this.viewBooks()
  
    this.searchByBookId = this.formBuilder.group({
      bookId: ['', Validators.required]
    })

    this.searchByISBN = this.formBuilder.group({
      isbn: ['', Validators.required]
    })
    
    this.searchByPublisher = this.formBuilder.group({
      publisher: ['', Validators.required]
    })
  }
  editBook(bookId:number){
    this.router.navigate(['editbook',bookId])
  }
  viewBooks() {
    this.bookService.getAllBooks().subscribe(
      (res:any)=>{
       this.show=true
        this.books=res
        console.log(res);
       
       
       
     }
    )}  
    getBookById(){
    
      if(this.textValue == null){
        this.viewBooks()
      }
      else{
      this.bookService.getBookById(this.searchByBookId.get('bookId')?.value).subscribe((data)=>{
        console.log(data);
        this.books=[];
        this.books[0]=data;
        if(this.books[0].bookId == 0){
          this.errorMessage = "No records found"
          this.books=[];
        }
        else{
          this.errorMessage = ""
        }
      }, error => {this.errorMessage = "No records found"}
      )
    }
    }
   
    getBookByPublisher(){
      if(this.textValue == ""){
        this.viewBooks()
      }
      
      else{
        this.bookService.getBookByPublisher(this.searchByPublisher.get('publisher')?.value).subscribe((data:any[])=>{
          console.log(data);
          this.books=data;
          if(this.books == null){
            this.errorMessage = "No records found"
        }
        else{
          this.errorMessage = ""
        }
        }, error => {this.errorMessage = "No records found"}
        )
    }
    }
    getBookByISBN(){
      if(this.textValue == null){
        this.viewBooks()
      }
      else{
      this.bookService.getBookByISBN(this.searchByISBN.get('isbn')?.value).subscribe((data)=>{
        console.log(data);
        this.books=[];
        this.books[0]=data;
        if(this.books[0].isbn == 0){
          this.errorMessage = "No records found"
          this.books=[];
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
    deleteBook(bookId:number){
      this.bookService.deleteBook(bookId).subscribe(
        (res:any)=>{
          
          });
    }

    deleteAlertConfirmation(userId:number){
      Swal.fire({
        title: 'Are you sure?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go ahead.',
        cancelButtonText: 'No, let me think'
      }).then((result) => {
        if (result.value) {
          this.deleteBook(userId)
          Swal.fire(
            'Removed!',
            'Book deleted successfully!',
            'success'
          )
          this.viewBooks()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Book Not Deleted!',
            'error'
          )
        }
      })
    }  
}

