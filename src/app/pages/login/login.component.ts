import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MatSnackBarVerticalPosition, MatSnackBarHorizontalPosition, MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApicallingService } from 'src/app/apicalling.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  loginForm= new FormGroup({
    loginemail: new FormControl("", [Validators.required, Validators.email]),
    loginpassword: new FormControl("", [Validators.required]),
  })
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(public router:Router,private _snackBar: MatSnackBar,public api:ApicallingService){

  }
 
  ngOnInit(): void {
   
    if(this.api.checkLogin()){
      this.router.navigate(['dashborad'])

    }
    else{
    
    }
  }

  showloginCredentials(){
    let {loginemail,loginpassword}=this.loginForm.value;
    if(loginemail="admin@gmail.com"&&loginpassword=="admin"){
      this.api.login();
      this.router.navigate(['dashborad']);
    }
    else{
      console.log(2);
      // this.toastr.success('Hello world!', 'Toastr fun!');
      this._snackBar.open("Email Or Password is incorrect",'close',{
        duration: 3000, horizontalPosition: this.horizontalPosition,verticalPosition:this.verticalPosition
      })

    }
  
  }
  get loginemail(){
   return this.loginForm.get('loginemail')
 }
 get loginpassword(){
   return this.loginForm.get('loginpassword')
 }
 

}
