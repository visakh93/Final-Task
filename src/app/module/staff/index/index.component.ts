import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  userId!: any;
  workDetails: any = [];

  userData: any = {
    name: '',
    age: '',
    email: '',
    blood: '',
    password: '',
    mobile: '',
    dob: '',
    image: '',
    gender: '',
    role: '',
    pin: '',
    address: ''
  }

  updateWork: any = [];
  pendingWork: any = [];

  constructor(private activeRouter: ActivatedRoute
    , private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: any) => {
      if (params.id == undefined) {
        params.id = this.userId;
      }
      this.userId = params.id;
    })

    setTimeout(() => {

      this.apiService.getById(this.userId).subscribe((res) => {

        this.userData = res;
        this.workDetails = this.userData.work;
        let i = 0;
        this.workDetails.forEach((el: any, index: number) => {
          console.log(index);

          if (el.status == false) {
            el.workId = index;
            this.pendingWork.push(el);

          }
        });

      })
    }, 0);
  }
  gotoEdit() {

    // this.router.navigate(['./admin/addStaff'])
    this.router.navigate(['./staff/edit/', this.userId])
  }
  gotoLeaveUpdate() {
    this.router.navigate(['./staff/leaveUpdate/', this.userId]);
  }
  OnWorkAdd(workForm: any) {
    workForm.value.status = false;
    this.pendingWork.unshift(workForm.value)
    let patchData = { work: this.pendingWork }
    this.apiService.getPatch(this.userId, patchData).subscribe((res) => {


    })
  }

  deleteWork(count: any) {
    let workDetailsId = this.pendingWork[count].workId
    this.workDetails[workDetailsId].status = true;
    let patchData = { work: this.workDetails }
    this.apiService.getPatch(this.userId, patchData).subscribe((res) => {
      this.pendingWork.splice(count, 1)

    })

  }

}

