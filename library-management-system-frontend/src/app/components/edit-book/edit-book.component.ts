import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  editBookForm:FormGroup;
  book:Book;
  bookId?:number;
  constructor(public router:Router,public bookService:BookService,public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder) { }

 
  ngOnInit(): void {
    this.book=new Book()
   this.bookId = this.activatedRoute.snapshot.params['bookId'];
  
  if(this.bookId!=-1){
      this.bookService.getBookById(this.bookId)
      .subscribe(data=>{
        console.log(data)
        this.book=data
      
    this.editBookForm = this.formBuilder.group({
      bookId:[this.book.bookId],
      isbn: [this.book.isbn, Validators.required],
      bookName:[this.book.bookName,Validators.required],
      authorName:[this.book.authorName,Validators.required],
      publisher:[this.book.publisher,Validators.required],
      genre:[this.book.genre, Validators.required],
      volume:[this.book.volume,Validators.required],
      edition:[this.book.edition,Validators.required]
      })
    })}}


    updateBookDetails(){
      this.bookService.updateBook(this.editBookForm?.value)
      .subscribe(
        response => {
          
          
        },error=>{
          
          console.log("#######updated successfully ");
          this.successNotification()
          this.router.navigate(['adminfunctions'])
        });
}
return(){
  this.router.navigate(['adminfunctions'])
}


successNotification(){
  Swal.fire('Success', 'User details Updated Successfully!', 'success')
}

}