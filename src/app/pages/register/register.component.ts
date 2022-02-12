import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
 registerForm= new FormGroup({
   name: new FormControl("", [Validators.required, Validators.pattern('[a-zA-Z]+$')]),
   email: new FormControl("", [Validators.required, Validators.email]),
   password: new FormControl("", [Validators.required, Validators.minLength(8)]),
 })
 get name(){
   return this.registerForm.get('name')
 }
 get email(){
  return this.registerForm.get('email')
}
get password(){
  return this.registerForm.get('password')
}


}
