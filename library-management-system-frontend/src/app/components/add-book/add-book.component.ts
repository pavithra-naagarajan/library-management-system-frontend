import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  addBookForm?: FormGroup;
  isbnBook?:Book
  errorMessage: string;
  constructor(public bookService: BookService, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit(): void {
    this.addBookForm = this.formBuilder.group({
      bookId:[-1],
      isbn: ['', Validators.required],
      bookName:['',Validators.required],
      authorName:['',Validators.required],
      publisher:['',Validators.required],
      genre:['', Validators.required],
      volume:['',Validators.required],
      edition:['',Validators.required]
    })
  }


  addBookDetails(){
    this.bookService.addBook(this.addBookForm?.value)
    .subscribe(
      response => {
      },error => {
        this.successNotification();
        this.router.navigate(['adminfunctions'])
      })
       
      
}
isbnCheck(){
  this.bookService.getBookByISBN(this.addBookForm.get('isbn').value).subscribe(data=>{
    this.isbnBook=data
    if(this.isbnBook==null){
      this.errorMessage=""
      this.addBookDetails()
    }
    else{
      this.errorMessage="**ISBN already exists!"
    }
  })
}
return(){
  this.router.navigate(['adminfunctions'])
}
successNotification(){
  Swal.fire('Success', 'Book Added Successfully!', 'success')
}
  }


