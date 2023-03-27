import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public progress: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  currentpage = 0;
  limit = 50;
  value:any=[];
  url = 'http://localhost:3000/employee/'
  leaveUrl='http://localhost:3000/leaveData/';
  constructor(private http: HttpClient) { }

  getAllEmp() {
    this.currentpage++;
    return this.http.get(`${this.url}?_page=${this.currentpage}&_limit=${this.limit}`)
  }
  // getAllUser() {
  //   return this.http.get(this.url)
  // }

  // ------------ ALL DATA ------------------------

  getAllUser(){
  return  this.value= this.http.get(this.url).pipe(map((res)=>{
      return res;
    }),catchError((err)=>{
      alert('getting data Http Error')
      
      return of(err)
    }))
  }
  getByName(name: string) {
    return this.http.get(`${this.url}?name=${name}`)
  }
  getById(id: number) {
    return this.http.get(`${this.url}${id}`)
  }
  getByValue(objElement: any, value: any) {
    return this.http.get(`${this.url}?${objElement}=${value}`)
  }
  

// get applied leave list 

getAllLeaveList(){
  return  this.value= this.http.get(this.leaveUrl).pipe(map((res)=>{
      return res;
    }),catchError((err)=>{
      alert('getting data Http Error')
      
      return of(err)
    }))
  }




  // ---------------POST DATA -----------------

  getPost(userData:any){ 
    return this.http.post(this.url,userData).pipe(map((res)=>{
      console.log('post : ',res);
      return res;
    }),catchError((err)=>{
      alert('getting data Http Error')
      
      return of(err)
    }))
  }
  //  FOR LEAVE
  getPostLeave(userData:any){ 
    return this.http.post(this.leaveUrl,userData).pipe(map((res)=>{
      console.log('post : ',res);
      return res;
    }),catchError((err)=>{
      alert('getting data Http Error')
      
      return of(err)
    }))
  }

// ------------- PUT/REPLACE DATA ---------------------


  getPut(id:any,userData:any) {
    return this.http.put(this.url+id,userData).pipe(map((res)=>{
      return res;
    }),catchError((err)=>{
      alert('getting data Http Error')
      
      return of(err)
    }))  
   }

// ------------ PATCH/UPDATE DATA -------------------

  getPatch(id:any,userData:any) {
   return this.http.patch(this.url+id,userData).pipe(map((res)=>{
      return res;
     }),catchError((err)=>{
      alert('getting data Http Error')
      
      return of(err)
    }))
   }

   // for leave

   getLeavePatch(id:any,userData:any) {
    return this.http.patch(this.leaveUrl+id,userData).pipe(map((res)=>{
       return res;
      }),catchError((err)=>{
       alert('getting data Http Error')
       
       return of(err)
     }))
    }

// --------------- DELETE DATA ---------------

  getDelete(Id:any) {
   return this.http.delete(this.url+Id).pipe(map((res)=>{
return res;
    }),catchError((err)=>{
      alert('getting data Http Error')
      
      return of(err)
    })
    )
   }
   getLeaveDelete(Id:any) {
    return this.http.delete(this.leaveUrl+Id).pipe(map((res)=>{
 return res;
     }),catchError((err)=>{
       alert('getting data Http Error')
       
       return of(err)
     })
     )
    }
  

}
   