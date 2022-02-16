import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApicallingService {

  constructor(public router:Router) { }

 
   checkLogin():boolean{
     if(localStorage.getItem('login')){
       
              return true;
     }
     return false;
   }
   
   login(){
    localStorage.setItem('login',"true");
      
   }
   
    logout()
    {
      localStorage.removeItem('login');
      this.router.navigate(['login']);
    }
   
  
 
  
}
