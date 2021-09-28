import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm:FormGroup;
  
  constructor(public router:Router, public userService: UserService,public formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      mailId:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
   
    }
    userLogin(){
      this.userService.userLogin(this.loginForm.get('mailId')?.value, this.loginForm.get('password')?.value)
      .subscribe(
        response => {
          console.log(response)
          this.router.navigate(['userfunctions',this.loginForm.get('mailId')?.value])
          if(response==null){
            console.log("login failed")
            this.WrongLoginNotification()
            this.router.navigate(['userlogin'])
          }
       else{
         
         this.successNotification()
          console.log("#######logged successfully ");

          this.router.navigate(['userfunctions',this.loginForm.get('mailId')?.value])
          }

        }
        );


}
return(){
  this.router.navigate([''])

}
signup(){
  this.router.navigate(['usersignup'])
}
generatePassword(){
  this.router.navigate(['forgotpassword'])

}

WrongLoginNotification(){
  Swal.fire('WRONG', 'Check UserMail Id and Password', 'error')
}
successNotification(){
  Swal.fire('Success', 'Login Success!', 'success')
}


}