import {AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit{
  loginForm!: FormGroup;
  userId: number = 0
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.pattern("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,16})")])]
    })
    
    localStorage.clear()
    
  }
  ngAfterViewInit(){
   
  }

  

  onLogin(form: FormGroup) {
    console.log(form.value);
    localStorage.setItem("userData", JSON.stringify(form.value));
      // this.userId= this.loginService.getId();
      setTimeout(() => {
        this.loginService.getLogin();
      }, 0);
  }
}
