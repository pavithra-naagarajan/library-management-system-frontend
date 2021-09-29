import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueBook } from 'src/app/models/issue-book';
import { IssueBookService } from 'src/app/services/issue-book.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
issuedDetails:IssueBook[]=[];
i?:number
  constructor(public router:Router,public issueBookService:IssueBookService) { }

  ngOnInit(): void {
    this.fineUpdate()
  }
fineUpdate(){
this.issueBookService.getAllIssuedDetails().subscribe(data=>{
this.issuedDetails=data
for(this.i=0;this.i<this.issuedDetails.length;this.i++){
  if(this.issuedDetails[this.i].dueDate <new Date()){
this.issueBookService.updateFine(this.issuedDetails[this.i].issueId).subscribe(data=>{
  console.log(data)
  console.log("success")
})
}
}
})
}

}
