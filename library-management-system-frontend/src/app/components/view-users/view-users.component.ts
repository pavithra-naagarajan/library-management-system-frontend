import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
show?:boolean;
users:User[]=[]
userRole?:string;
firstName?:string;
userId?:number
searchBy:String = "default";
textValue:any=null;
errorMessage?:string
searchByUserId?:FormGroup
searchByRole?:FormGroup
searchByName?:FormGroup
constructor(public router:Router,public userService:UserService,public formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.viewUsers()

    this.searchByUserId = this.formBuilder.group({
      userId: ['', Validators.required]
    })

    this.searchByRole = this.formBuilder.group({
    userRole: ['', Validators.required]
    })
    
    this.searchByName = this.formBuilder.group({
      firstName: ['', Validators.required]
    })
  }
  
  viewUsers() {
    this.userService.getAllUsers().subscribe(
      (res:any)=>{
       this.show=true
        this.users=res
        console.log(res);
     }
    )}  

    getUserById(){
    
      if(this.textValue == null){
        this.viewUsers()
      }
      else{
      this.userService.getUserById(this.searchByUserId.get('userId')?.value).subscribe((data)=>{
        console.log(data);
        this.users=[];
        this.users[0]=data;
        if(this.users[0].userId == 0){
          this.errorMessage = "No records found"
          this.users=[];
        }
        else{
          this.errorMessage = ""
        }
      }, error => {this.errorMessage = "No records found"}
      )
    }
    }
    getUserByRole(){
      if(this.textValue == ""){
        this.viewUsers()
      }
      
      else{
        this.userService.getUserByRole(this.searchByRole.get('userRole')?.value).subscribe((data:any[])=>{
          console.log(data);
          this.users=data;
          if(this.users == null){
            this.errorMessage = "No records found"
        }
        else{
          this.errorMessage = ""
        }
        }, error => {this.errorMessage = "No records found"}
        )
    }
    }
    getUserByName(){
      if(this.textValue == ""){
        this.viewUsers()
      }
      
      else{
        this.userService.getUserByName(this.searchByName.get('firstName')?.value).subscribe((data:any[])=>{
          console.log(data);
          this.users=data;
          if(this.users == null){
            this.errorMessage = "No records found"
        }
        else{
          this.errorMessage = ""
        }
        }, error => {this.errorMessage = "No records found"}
        )
    }
    }

    return(){
this.router.navigate(['adminfunctions'])
    }
    deleteUser(userId:number){
      this.userService.deleteUser(userId).subscribe(
        (res:any)=>{
          
          });
    }

    deleteAlertConfirmation(userId:number){
      Swal.fire({
        title: 'Are you sure?',
        text: 'This process is irreversible.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, go ahead.',
        cancelButtonText: 'No, let me think'
      }).then((result) => {
        if (result.value) {
          this.deleteUser(userId)
          Swal.fire(
            'Removed!',
            'User deleted successfully!',
            'success'
          )
          this.viewUsers()
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'User Not Deleted!',
            'error'
          )
        }
      })
    }  
}
