import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';
import { AdminService } from 'src/app/services/admin.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  adminLoginForm:FormGroup;
  admin?:Admin
  constructor(public router:Router, public adminService: AdminService,public formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.adminLoginForm = this.formBuilder.group({
      adminId:['',[Validators.required]],
      adminPassword:['',[Validators.required]]
    })
    }
    adminLogin(){
      if(this.adminLoginForm.get('adminId').value==1 && this.adminLoginForm.get('adminPassword').value=='admin1111'){
this.successNotification()
console.log("login success!")
        this.router.navigate(['superadmin'])
      }
     
else{
  this.adminService.adminLogin(this.adminLoginForm.get('adminId').value,this.adminLoginForm.get('adminPassword').value).subscribe(data=>{
this.admin=data
console.log("********"+data)
if(this.admin!=null){
  this.successNotification()
console.log("login success!")
      this.router.navigate(['adminfunctions',this.adminLoginForm.get('adminId').value])
}
else{
this.WrongLoginNotification()
this.router.navigate(['adminlogin'])
}
  })
 
}
}


WrongLoginNotification(){
  Swal.fire('WRONG', 'Check Admin Id and Password', 'error')
}
successNotification(){
  Swal.fire('Success', 'Login Success!', 'success')
}
}

