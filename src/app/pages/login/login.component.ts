import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  loginForm= new FormGroup({
    loginemail: new FormControl("", [Validators.required, Validators.email]),
    loginpassword: new FormControl("", [Validators.required, Validators.minLength(8)]),
  })
  showloginCredentials(){
    console.warn(this.loginForm.value)
  }
  get loginemail(){
   return this.loginForm.get('loginemail')
 }
 get loginpassword(){
   return this.loginForm.get('loginpassword')
 }
 

}
