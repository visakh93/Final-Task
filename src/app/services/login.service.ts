import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3000/employee/'


  constructor(private apiService: ApiService, private http: HttpClient, private router: Router) { }
  allUser: any = [];
  userId: any;
  user: any;
  getAll: any = [];

  //   setAllUser() {
  //     this.apiService.getAllUser().subscribe((response) => {
  //       this.allUser = response;
  //       console.log(this.allUser);
  //     })
  //   }

  //   getUser(){
  // return  this.http.get(this.url).pipe(map((response)=>
  //   {
  //     return response

  //   }
  //   ),catchError((err)=>{
  //     alert('getting data Http Error')

  //     return of(err)
  //   }))
  //   }

  //   getAllUsers(){
  //     this.getUser().subscribe((res)=>{
  //       this.getAll = res;
  //     })
  //     return this.getAll;
  //   }

  // getId(): any {
  //   this.userId = 0;
  //   let userJson = localStorage.getItem('userData');
  //   if (userJson != null) {
  //     let userObj = JSON.parse(userJson);
  //     let userName = userObj.name.trim();
  //     let userPassword = userObj.password.trim();

  //     for (let i = 0; i < this.allUser.length; i++) {
  //       if (this.allUser[i].name == userName && this.allUser[i].password == userPassword) {
  //         this.userId = this.allUser[i].id;
  //         this.user = this.allUser[i];
  //         console.log('checked', this.user);
  //         localStorage.setItem('user', JSON.stringify(this.user))
  //         return this.userId;
  //       }else if(userName=='admin' && userPassword=='Admin123'){
  //         console.log(this.allUser);

  //         localStorage.setItem('allStaff',JSON.stringify(this.allUser))
  //         return 0;
  //       }
  //     }
  //   }
  //   return this.userId;

  // }


  getLogin() {
    let userJson = localStorage.getItem('userData');
    if (userJson != null) {
      let userObj = JSON.parse(userJson);
      let userName = userObj.name.trim();
      let userPassword = userObj.password.trim();
      let isStaff = false;
      this.apiService.getAllUser().subscribe((res) => {
        this.allUser = res;


        this.allUser.forEach((el: any) => {
          if (el.name == userName && el.password == userPassword) {
            this.userId = el.id;
            this.user = el;
            console.log('checked', this.user);
            localStorage.setItem('user', JSON.stringify(this.user))
            localStorage.setItem('userId', this.userId)
            isStaff = true;

            let status = { status: true }

            this.apiService.getPatch(this.userId, status).subscribe((res) => {
              console.log('destory', res);
      
            })

            this.router.navigate(['/staff', this.userId])

          } else if (userName == 'admin' && userPassword == 'Admin123') {
            console.log(this.allUser);
            localStorage.setItem('user', JSON.stringify('admin'))
            localStorage.setItem('userId', JSON.stringify(0))
            localStorage.setItem('allStaff', JSON.stringify(this.allUser))
            this.router.navigate(['./admin']);
            isStaff = true;
          }
        });
        if (!isStaff) {
          alert('pleace check username and password')
        }
      })


    }

  }

  destroy() {
    let userIdValue = localStorage.getItem('userId');
    if (userIdValue != null) {
      let userId = parseInt(userIdValue)
      let status = { status: false }
      this.apiService.getPatch(userId, status).subscribe((res) => {
        console.log('destory', res);

      })

    }
  }
}
