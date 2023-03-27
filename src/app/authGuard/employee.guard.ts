import { Injectable,OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {
  
  constructor(private router:Router,private loginService:LoginService){}
   userId:any = localStorage.getItem('userId');
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userId = localStorage.getItem('userId');
      let id=0 ;
      console.log('auth state',state.url.split('/').at(-1));
      let urlId = state.url.split('/').at(-1);
      if(urlId){
        if(userId ){
          if( parseInt(userId) == parseInt(urlId) ){
            console.log('auth : ',userId);
            return true;
          }else{
      this.loginService.destroy();
            this.router.navigate(['./login'])
       return false;
     }
    }else {
      this.loginService.destroy();
      this.router.navigate(['./login'])
      return false;
    }
  }else {
    this.loginService.destroy();
    this.router.navigate(['./login'])
    return false;
    }
  }
 
}
