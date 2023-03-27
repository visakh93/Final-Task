import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { MatSort } from '@angular/material/sort';
import { LoginService } from 'src/app/services/login.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort!: MatSort
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  search = '';
  searchKey = 'Name';
  displayedColumns: string[] = ['image', 'name', 'age', 'dob', 'blood', 'gender', 'email', 'mobile', 'leaveDetails', 'delete'];
  toArray: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private el: ElementRef) { }

  dataSource: any;
  userDataList: any = [];
  leaveData: any = [];
  deleteHide: any = true;

  ngOnInit(): void {

    setTimeout(() => {

      this.apiService.getAllUser().subscribe((response) => {
        this.userDataList = response

        this.userDataList = response
        this.dataSource = new MatTableDataSource<any>(this.userDataList);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;


      })

    }, 0);
  }
  goToAllStaff() {
    this.router.navigate(["./admin/getAllStaff"])
  }


  // ----------------- SEARCH DATA ------------

  onSearch() {
    let arr = new Array();
    let searchValue;
    let searchValueLength = this.search.length;
    console.log('search Length :', searchValueLength);
    let getValue = false;

    for (let i = 0; i < this.userDataList.length; i++) {
      switch (this.searchKey) {
        case 'Name':
          searchValue = this.userDataList[i].name.substring(0, searchValueLength)
          break;
        case 'byId':
          searchValue = this.userDataList[i].id
          break;
        case 'byAge':
          searchValue = this.userDataList[i].age
          break;
        case 'byGender':
          searchValue = this.userDataList[i].gender.substring(0, searchValueLength)
          break;
        case 'byBlood':
          searchValue = this.userDataList[i].blood
          break;
        default:
          break;
      }
      if (searchValue == this.search) {
        getValue = true;
        arr.push(this.userDataList[i])
        this.dataSource = arr
      }
    }

    if (!getValue) {
      this.dataSource = [];
    }
  }

  // ----------- GET TABLE ROW DETAILS ------------
  getRow(id: any) {

    if (confirm('Do you want to edit profle')) {
      let user;
      this.apiService.getById(id).subscribe((res) => {

        user = res;
        localStorage.setItem('EditUser', JSON.stringify(user));

      })
      this.router.navigate(['./admin/edit/', id])

    } else {


    }
  }

  // ---------------- CHANGE COLUMN DATA ---------------

  editCol(element: any, event: Event, selectedCol: any) {

    let elementValue = (event.target as HTMLInputElement).value.trim()
    let value = { [selectedCol]: elementValue, edit: true }

    setTimeout(() => {

      this.apiService.getPatch(element.id, value).subscribe((res) => {
        this.inputArry.set(selectedCol, 1)

        this.apiService.getAllUser().subscribe((res) => {

          this.userDataList = res;
          this.dataSource = this.userDataList
          this.deleteHide = true;

        })
      })
    }, 0);


  }

  // ------------ CHANGE SELECTION --------------
  inputKey = '';
  inputArry = new Map<string, number>([
    ['name', 1],
    ['age', 1],
    ['dob', 1],
    ['dob', 1],
    ['blood', 1],
    ['gender', 1],
    ['email', 1],
    ['mobile', 1],
    ['leaveDetails', 1],
    ['payment', 1],
  ]
  );

  editBool(id: any, inputKey: any) {
    let input: HTMLInputElement = this.el.nativeElement as HTMLInputElement;
    input.focus();
    this.deleteHide = false;
    this.inputArry.set(inputKey, 0)


    this.inputKey = inputKey;

    setTimeout(() => {

      let obj = { edit: false }
      this.apiService.getPatch(id, obj).subscribe((res) => {
        this.apiService.getAllUser().subscribe((res) => {
          this.userDataList = res;

          this.dataSource = this.userDataList
        })
      })
    }, 0);
  }


  addNewStaff() {
    this.router.navigate(['./admin/addStaff'])
  }

  delete(id: any, e: any) {

    let arr = [];
    this.apiService.getDelete(id).subscribe((res) => {

      this.apiService.getAllUser().subscribe((res) => {
        arr = res;
        this.dataSource = arr
      })
    })
  }
}
