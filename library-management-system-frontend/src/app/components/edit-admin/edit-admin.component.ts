import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnInit {
  editAdminForm:FormGroup;
  admin?:Admin;
  adminId?:number;
  constructor(public router:Router,public adminService:AdminService,public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder) { }

 
  ngOnInit(): void {
    this.admin=new Admin()
   this.adminId = this.activatedRoute.snapshot.params['adminId'];
  
  if(this.adminId!=-1){
      this.adminService.getAdminById(this.adminId)
      .subscribe(data=>{
        console.log(data)
        this.admin=data
      
    this.editAdminForm = this.formBuilder.group({
      adminId: [this.admin.adminId],
    adminName: [this.admin.adminName, [Validators.required]],
     
      adminPassword: [this.admin.adminPassword, [Validators.required]],
    adminRole:[this.admin.adminPassword],
     
      mailId: [this.admin.mailId, [Validators.required,Validators.email]],
     
      })
    })}}


    updateAdminDetails(){
      this.adminService.updateAdmin(this.editAdminForm?.value)
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
  Swal.fire('Success', 'Admin details are Updated Successfully!..', 'success')
}

}
