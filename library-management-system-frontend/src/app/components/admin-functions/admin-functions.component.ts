import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-functions',
  templateUrl: './admin-functions.component.html',
  styleUrls: ['./admin-functions.component.css']
})
export class AdminFunctionsComponent implements OnInit {

  adminId?:number
  constructor(public router:Router,public activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.adminId = this.activatedRoute.snapshot.params['adminId'];
  }

  viewAdminProfile(){
    this.router.navigate(['viewadminprofile',this.adminId])
  }
  
}
