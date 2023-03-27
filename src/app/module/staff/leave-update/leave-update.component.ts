import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { color, json } from 'd3';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-leave-update',
  templateUrl: './leave-update.component.html',
  styleUrls: ['./leave-update.component.scss']
})
export class LeaveUpdateComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private apiService: ApiService,
    private activateRouter: ActivatedRoute) { }
  displayedColumns: string[] = ['count', 'leaveType', 'leaveCount', 'reason', 'leaveStart', 'leaveEnd', 'action'];
  dataSource: any;
  leavePedingColumns: string[] = ['count', 'leaveType', 'leaveCount', 'reason', 'leaveStart', 'leaveEnd'];
  leavePedingSource: any;
  startDate = new Date();
  leaveForm!: FormGroup;
  getUpdate: any = [];
  userId: any;
  user: any;
  leaveData: any = {
    leaveStart: '',
    leaveEnd: '',
    leaveCount: '',
    leaveType: '',
    reason: '',
  }

  leaveApplyList: any = [];
  applyDetails: any = {};

  leaveApplied: any; //for day calculation
  newList: any = [];

  ngOnInit(): void {

    this.activateRouter.params.subscribe((params: any) => {
      if (params.id == undefined) {
        this.userId = params.id
      }
      this.userId = params.id

    })
    setTimeout(() => {
      this.apiService.getAllLeaveList().subscribe((res) => {
        console.log('totel leaveList', res);
        this.leaveApplyList = res;


        this.leaveApplyList.forEach((item: any) => {
          console.log(item.userId, ' ', this.userId);

          if (item.userId == this.userId) {
            console.log('item :', item);
            this.newList.push(item)
          }
        });
        this.leavePedingSource = this.newList

      })



      this.apiService.getById(this.userId).subscribe((res) => {

        this.user = res;


        this.getUpdate = this.user.leaveData
        console.log(this.getUpdate);

        this.dataSource = new MatTableDataSource<any>(this.getUpdate);
        //  this.dataSource = new MatTableDataSource<any>(this.getUpdate);
        this.leaveForm = this.fb.group({
          name: [{ value: this.user.name, disabled: true }],
          role: { value: this.user.role, disabled: true },
          phone: this.user.mobile,
          leaveStart: ['', Validators.required],
          leaveEnd: ['', Validators.required],
          leaveCount: { value: '', disabled: true },
          leaveType: ['', Validators.required],
          reason: ['', Validators.required]
        })
      })
    }, 0);
  }

  GetDayCount(form: FormGroup) {
    let leaveStart = new Date(form.value.leaveStart);
    let leaveEnd = new Date(form.value.leaveEnd)
    let leaveStartDate = leaveStart.getDate();
    let leaveEndDate = leaveEnd.getDate();


    let startMonth = leaveStart.getMonth();
    let endMonth = leaveEnd.getMonth();
    let startYear = leaveStart.getFullYear()
    let endYear = leaveEnd.getFullYear()

    let startMonthDays = this.getTotelMonthDays(startYear, startMonth + 1)
    let endMonthDays = this.getTotelMonthDays(endYear, endMonth + 1)
    let leaveCount = 0;



    if (startMonth === endMonth && startYear === endYear) {
      leaveCount = (leaveEnd.getDate() - leaveStart.getDate()) + 1
    } else if (startMonth !== endMonth && startYear === endYear) {

      //get difference between month
      let nextmonth = startMonth + 1
      let nextmonthDays;
      let totelMonthDays = 0;
      let monthDiff = (endMonth - startMonth) - 1;
      for (let i = 0; i < monthDiff; i++) {
        nextmonthDays = this.getTotelMonthDays(startYear, nextmonth + 1)
        totelMonthDays += nextmonthDays
        nextmonth++;
        console.log('loop', totelMonthDays);
      }


      console.log(monthDiff);
      console.log();

      leaveCount = totelMonthDays;
      leaveCount += (startMonthDays - leaveStartDate) + (leaveEndDate);
    } else if (startMonth !== endMonth || startYear !== endYear) {

      let nextmonth = startMonth + 1
      let nextmonthDays;
      let totelMonthDays = 0;

      let startMonthleaveDays = startMonthDays - leaveStartDate + 1;
      console.log('year base ', startMonthleaveDays);
      console.log('year base ', startMonth);
      for (let i = nextmonth; i < 12; i++) {
        nextmonthDays = this.getTotelMonthDays(startYear, i + 1)
        totelMonthDays += nextmonthDays
        // console.log('year base :totle',totelMonthDays);
      }

      let endLeaveMonth = endMonth;
      for (let i = 0; i < endLeaveMonth; i++) {
        nextmonthDays = this.getTotelMonthDays(startYear, i + 1)
        totelMonthDays += nextmonthDays
        console.log('year base loop : ', endLeaveMonth, " ", i, " value : ", totelMonthDays);
      }

      leaveCount = totelMonthDays;
      leaveCount += (startMonthDays - leaveStartDate + 1) + (leaveEndDate);

    }
    if (leaveCount > 0) {

      this.leaveApplied = leaveCount;
      this.leaveForm.controls['leaveCount'].setValue(leaveCount)
      form.patchValue({ leaveCount: leaveCount })
    } else {
      alert('enter a valid date')
    }
  }
  getTotelMonthDays(year: any, month: any) {
    return new Date(year, month, 0).getDate();
  }

  onSubmit(form: FormGroup) {

    if (form.valid) {
      let leaveObj;
      this.leaveData.leaveStart = formatDate(form.value.leaveStart, 'yyyy-MM-dd', 'en');
      this.leaveData.leaveEnd = formatDate(form.value.leaveEnd, 'yyyy-MM-dd', 'en');
      this.leaveData.leaveCount = this.leaveApplied;
      this.leaveData.leaveType = form.value.leaveType;
      this.leaveData.reason = form.value.reason

      this.newList.push(this.leaveData)

      this.applyDetails.userId = this.user.id;
      this.applyDetails.name = this.user.name;
      this.applyDetails.role = this.user.role;
      this.applyDetails.mobile = this.user.mobile;
      this.applyDetails.leaveStart = formatDate(form.value.leaveStart, 'yyyy-MM-dd', 'en');
      this.applyDetails.leaveEnd = formatDate(form.value.leaveEnd, 'yyyy-MM-dd', 'en');
      this.applyDetails.leaveCount = this.leaveApplied;
      this.applyDetails.leaveType = form.value.leaveType;
      this.applyDetails.reason = form.value.reason
      this.applyDetails.approved = false
      this.applyDetails.rejceted = false
      this.leaveApplyList.push(this.applyDetails)

      this.apiService.getPostLeave(this.applyDetails).subscribe((res) => {

        this.leavePedingSource = this.leaveApplyList

        this.leaveForm.reset();
      })


      this.getUpdate.push(this.leaveData);
      leaveObj = { leaveData: this.getUpdate }

    }
  }
}
