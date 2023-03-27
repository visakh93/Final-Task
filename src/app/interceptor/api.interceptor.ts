import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { ApiService } from '../services/api.service';
import { LoginService } from '../services/login.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private apiService:ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    

   let token = "getLogin"
   let responseKey= request.clone({
    setHeaders:{'Auth-Header':`Token  ${token}`}
   })
    
    return next.handle(responseKey).pipe(
      tap((event:any)=>{
        
        this.apiService.isLoading.next(true)
        this.apiService.progress.next(Math.round(event.loaded / event.total * 100));
      }),
      catchError((error:any)=>{
        // alert('Http Error')
        return of(error)
      })
      ,finalize(()=>{
        this.apiService.isLoading.next(false)
        this.apiService.progress.next(0);
      })
    )
  }
}
