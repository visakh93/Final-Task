import { Component, OnInit, OnDestroy, Output, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private activeRoute: ActivatedRoute, private router: Router, private loginService: LoginService) { }
  @ViewChild(IndexComponent) currentUserId!: IndexComponent;
  userId: any;


  ngOnInit() {
    this.userId = localStorage.getItem('userId')
  }

  gotToLogin() {
    this.router.navigate(['/login'])
  }

  ngOnDestroy(): void {
    this.loginService.destroy();

  }

}
