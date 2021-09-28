import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-userviewbooks',
  templateUrl: './userviewbooks.component.html',
  styleUrls: ['./userviewbooks.component.css']
})
export class UserviewbooksComponent implements OnInit {
  books:Book[]=[]
  mailId?:string;
  constructor(public router:Router,public bookService:BookService,public activatedRoute:ActivatedRoute) { }
  
    ngOnInit(): void {
      this.mailId = this.activatedRoute.snapshot.params['mailId'];
      console.log("%%%%%%%%%%%%%%%%%5"+this.mailId)
      this.viewBooks()
    }
    
    viewBooks() {
      this.bookService.getAllBooks().subscribe(
        (res:any)=>{
         
          this.books=res
          console.log(res);
         
         
         
       }
      )}  
      requestBook(bookId:number){
        this.router.navigate(['requestbook',bookId,this.mailId])
        }
  
      return(){
  this.router.navigate(['userfunctions',this.mailId])
      }
    }
