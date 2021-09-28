import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-functions',
  templateUrl: './user-functions.component.html',
  styleUrls: ['./user-functions.component.css']
})
export class UserFunctionsComponent implements OnInit {
mailId?:string;
  constructor(public router:Router,public activatedRoute:ActivatedRoute,) { }

  ngOnInit(): void {
    this.mailId = this.activatedRoute.snapshot.params['mailId'];
    console.log("#######################"+this.mailId)
  }
  view(){
   
    this.router.navigate(['viewprofile',this.mailId])
  }
  viewBooks(){
    this.router.navigate(['userviewbooks',this.mailId])
  }
  searchBooks(){
    this.router.navigate(['searchbooks',this.mailId])
  }
  viewIssueDetails(){
    this.router.navigate(['viewissue',this.mailId])

  }
  returnBook(){
    this.router.navigate(['returnbook',this.mailId])

  }
  renewBook(){
    this.router.navigate(['renewbook',this.mailId])
  }

}
