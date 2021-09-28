import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

 
  mailId?:string;
  user?:User;
  
  showProfile?:boolean;
 



  constructor(public router:Router,public userService:UserService,public activatedRoute:ActivatedRoute,
    public formBuilder:FormBuilder) { }

 
  ngOnInit(): void {
    this.mailId = this.activatedRoute.snapshot.params['mailId'];
    console.log(this.mailId)
    this.user = new User();
    this.userProfile()
   
    }
    
 

 
      


     

    userProfile(){
      this.userService.getUserByMailId(this.mailId).subscribe(
         (res:any)=>{
          
          console.log(res);
          this.user= res;
         
            this.showProfile=true;
        
        },
          err => {
            
           console.log("error block") }) 
      }
      
  updateUser(userId:number){
    this.router.navigate(['edituser',userId])

  }
  
  return(){
    this.router.navigate(['userfunctions',this.mailId])
  }
}
