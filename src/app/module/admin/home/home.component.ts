import { AfterViewChecked, Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, ViewChildren, QueryList, ChangeDetectorRef, ContentChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { IndexComponent } from '../index/index.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [IndexComponent]
})
export class HomeComponent implements OnInit {

  isLoading = this.apiService.isLoading;
  progress = this.apiService.progress;
  requestCount: any = '';
  showList: boolean = false;
  messageList: any = []
  messgeDetails: any = {
    id: '',
    name: '',
    role: '',
    mobile: '',
    leaveStart: '',
    leaveEnd: '',
    leaveCount: '',
    leaveType: '',
    reason: '',
  }
  approvedList: any = [];
  userData: any;
  constructor(private apiService: ApiService) { }


  ngOnInit() {

    this.apiService.getAllLeaveList().subscribe((res) => {
      this.messageList = res;
      this.requestCount = this.messageList.length;
    })
  }




  selectedItem(count: any) {
    console.log(this.messageList[count]);
    this.messgeDetails.name = this.messageList[count].name;
    this.messgeDetails.role = this.messageList[count].role;
    this.messgeDetails.mobile = this.messageList[count].mobile;
    this.messgeDetails.leaveStart = this.messageList[count].leaveStart;
    this.messgeDetails.leaveEnd = this.messageList[count].leaveEnd;
    this.messgeDetails.leaveCount = this.messageList[count].leaveCount;
    this.messgeDetails.leaveType = this.messageList[count].leaveType;
    this.messgeDetails.reason = this.messageList[count].reason;
    this.messgeDetails.id = this.messageList[count].id;
    this.messgeDetails.userId = this.messageList[count].userId;


    this.apiService.getById(this.messgeDetails.userId).subscribe((res) => {
      this.userData = res;

      this.approvedList = this.userData.leaveData;

    })
  }
  OnRejectMsg() {
    let reject = { rejceted: true }
    let id = this.messgeDetails.id
    this.apiService.getLeavePatch(id, reject).subscribe((res) => {

    })
  }
  OnApprovedMsg(status: any) {

    let user = {
      leaveStart: this.messgeDetails.leaveStart,
      leaveEnd: this.messgeDetails.leaveStart,
      leaveCount: this.messgeDetails.leaveCount,
      leaveType: this.messgeDetails.leaveType,
      reason: this.messgeDetails.reason,
      approved: true
    }

    let id = this.messgeDetails.id
    let userId = this.messgeDetails.userId
    let leaveUpdateCount = parseInt(this.userData.leaveDetails)
    let CurrentWeekLeave = this.userData.leaveCountByWeek.CurrentWeekLeave;

    if (status == 'reject') {
      user.approved = false;
    } else {
      user.leaveCount = parseInt(user.leaveCount)
      leaveUpdateCount = leaveUpdateCount + user.leaveCount;
      CurrentWeekLeave += user.leaveCount
    }
    this.approvedList.push(user);

    let leaveData = {
      leaveData: this.approvedList,
      leaveDetails: leaveUpdateCount,
      leaveCountByWeek: {
        "currentWeek": this.userData.leaveCountByWeek.currenWeek,
        "CurrentWeekLeave": CurrentWeekLeave,
        "PreviousWeekLeave": this.userData.leaveCountByWeek.PreviousWeekLeave
      }

    }

    this.apiService.getPatch(userId, leaveData).subscribe((res) => {
      this.apiService.getLeaveDelete(id).subscribe((res) => {
        this.apiService.getAllLeaveList().subscribe((res) => {
          this.messageList = res;
        })
      })

    })



  }
  showMessgeList() {
    this.showList = true;
  }


}