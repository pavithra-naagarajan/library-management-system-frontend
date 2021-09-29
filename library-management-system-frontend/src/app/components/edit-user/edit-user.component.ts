import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm:FormGroup;
  user:User;
  userId?:number;
  constructor(public router:Router,public userService:UserService,public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder) { }

 
  ngOnInit(): void {
    this.user=new User()
   this.userId = this.activatedRoute.snapshot.params['userId'];
  
  if(this.userId!=-1){
      this.userService.getUserById(this.userId)
      .subscribe(data=>{
        console.log(data)
        this.user=data
      
    this.editUserForm = this.formBuilder.group({
      userId: [this.user.userId],
      firstName: [this.user.firstName, [Validators.required, Validators.minLength(3)]],
      lastName: [this.user.lastName, [Validators.required]],
      password: [this.user.password, [Validators.required, Validators.minLength(6)]],
      
      gender: [this.user.gender, [Validators.required]],
      userRole:[this.user.userRole, [Validators.required]],
      age: [this.user.age, [Validators.required, Validators.minLength(18)]],
      mobileNumber: [this.user.mobileNumber, [Validators.required,Validators.minLength(10)]],
      mailId: [this.user.mailId, [Validators.required,Validators.email]],
      address: [this.user.address, [Validators.required]]
      })
    })}}


    updateUserDetails(){
      this.userService.updateUser(this.editUserForm?.value)
      .subscribe(
        response => {
          
          
        },error=>{
          
          console.log("#######updated successfully ");
          this.successNotification()
          this.router.navigate(['userfunctions',this.editUserForm.get('mailId').value])
        });
}
return(){
  this.router.navigate(['userfunctions',this.editUserForm.get('mailId').value])
}


successNotification(){
  Swal.fire('Success', 'User details are Updated Successfully!..', 'success')
}

}

