import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';

interface Search {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.css']
})
export class SearchBookComponent implements OnInit {
  
  dataFound:boolean = true;
  errorMessage?:string;
  books:Book[] = [];
  genre:String="any";
  searchBy:String = "default";
  bookName?:string;
  authorName?:string;
  searchByBookName!:FormGroup;
  searchByAuthorName!:FormGroup;
  textValue:any=null;
  mailId?:string;
  constructor(public bookService:BookService,public formBuilder:FormBuilder,
    public router:Router,public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  
    this.mailId = this.activatedRoute.snapshot.params['mailId'];
    this.refreshBooks()
  
    this.searchByBookName = this.formBuilder.group({
      bookName: ['', Validators.required]
    })
    this.searchByAuthorName = this.formBuilder.group({
      authorName: ['', Validators.required]
    })
 
  }

  issueBook(){
    
  }
  getBookByBookName(){
    console.log(this.searchByBookName.get('bookName')?.value)
    console.log(this.textValue)
    if(this.textValue == ""){
      this.refreshBooks()
    }
    
    else{
      this.bookService.getBookByBookName(this.searchByBookName.get('bookName')?.value).subscribe((data:any[])=>{
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


  getBookByAuthorName(){
    console.log(this.searchByAuthorName.get('authorName')?.value)
    console.log(this.textValue)
    if(this.textValue == ""){
      this.refreshBooks()
    }
    
    else{
      this.bookService.getBookByAuthorName(this.searchByAuthorName.get('authorName')?.value).subscribe((data:any[])=>{
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
refreshBooks(){
  this.bookService.getAllBooks().subscribe((data:any[])=>{
    console.log(data)
    this.books= data
    if(this.books == null){
      this.errorMessage = "No records found"
  }
  else{
    this.errorMessage = ""
  }
  }, error => {this.errorMessage = "No records found"})

}


getBookByGenre(event : any){
  if(this.genre == "any"){
    this.refreshBooks()
  }
  else{
    this.bookService.getBookByGenre(this.genre).subscribe((data:any[])=>{
      console.log(data);
      this.books=data;
      if(this.books.length==0){
        this.errorMessage = "No records found"
      }
      else{
      this.errorMessage = ""
      }
      }, error => {this.errorMessage = "No records found"}
    )
  }
}

requestBook(bookId:number){
this.router.navigate(['requestbook',bookId,this.mailId])
}
return(){
  console.log("88888888888"+this.mailId)
  this.router.navigate(['userfunctions',this.mailId])
      }



      book : Search[] = [
        {value: 'any', viewValue:'SearchBy Genre'},
        {value: 'Java', viewValue:'Java'},
        {value: 'Autobiography', viewValue:'Autobiography'},
        {value: 'Love', viewValue:'Love'}
    
      ]
}
