import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-view-admin-profile',
  templateUrl: './view-admin-profile.component.html',
  styleUrls: ['./view-admin-profile.component.css']
})
export class ViewAdminProfileComponent implements OnInit {
 
  admin?:Admin;
  adminId?:number
  showProfile?:boolean;
 



  constructor(public router:Router,public adminService:AdminService,public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder) { }

 
  ngOnInit(): void {
    this.adminId = this.activatedRoute.snapshot.params['adminId'];
    this.admin = new Admin();
    this.adminProfile()
   
    }
    
    adminProfile(){
      this.adminService.getAdminById(this.adminId).subscribe(
         (res:any)=>{
          
          console.log(res);
          this.admin= res;
         
            this.showProfile=true;
        
        },
          err => {
            
           console.log("error block") }) 
      }
      
  updateAdmin(adminId:number){
    this.router.navigate(['editadmin',adminId])

  }
  
  return(){
    this.router.navigate(['adminfunctions'])
  }
}

